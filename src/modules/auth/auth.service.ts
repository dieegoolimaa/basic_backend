import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserRole } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private invitesService: InvitesService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { name, email, password, inviteCode, phone, address, city } = registerDto;

        // Check if user already exists
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new BadRequestException('Email já cadastrado');
        }

        // Validate invite code
        const invite = await this.invitesService.validateCode(inviteCode, email);
        if (!invite) {
            throw new BadRequestException('Código de convite inválido ou expirado');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            role: UserRole.STUDENT,
            inviteCode,
            enrolledCourses: invite.courseIds,
        });

        // Mark invite as used
        await this.invitesService.markAsUsed(inviteCode, user._id.toString());

        // Generate token
        const payload = { userId: user._id, email: user.email, role: user.role };
        return {
            user: this.sanitizeUser(user),
            token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Conta desativada');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { userId: user._id, email: user.email, role: user.role };
        return {
            user: this.sanitizeUser(user),
            token: this.jwtService.sign(payload),
        };
    }

    async validateInviteCode(code: string) {
        const invite = await this.invitesService.findByCode(code);
        if (!invite || invite.status !== 'pending') {
            return { valid: false };
        }

        return {
            valid: true,
            email: invite.email,
            courseIds: invite.courseIds,
        };
    }

    private sanitizeUser(user: any) {
        const { password, ...result } = user.toObject();
        return result;
    }
}
