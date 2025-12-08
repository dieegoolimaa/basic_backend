import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CreateInviteDto } from './dto/invite.dto';

@Controller('invites')
@UseGuards(JwtAuthGuard, AdminGuard)
export class InvitesController {
    constructor(private readonly invitesService: InvitesService) { }

    @Post()
    async create(@Request() req: any, @Body() createInviteDto: CreateInviteDto) {
        return this.invitesService.create(req.user.userId, createInviteDto);
    }

    @Get()
    async findAll() {
        return this.invitesService.findAll();
    }

    @Get('pending')
    async findPending() {
        return this.invitesService.findPending();
    }

    @Delete(':code')
    async cancel(@Param('code') code: string) {
        return this.invitesService.cancel(code);
    }

    @Post(':code/resend')
    async resend(@Param('code') code: string) {
        return this.invitesService.resendInvite(code);
    }
}
