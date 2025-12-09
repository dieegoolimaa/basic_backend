import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { inviteEmailTemplate } from './templates/invite.template';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;
  private isMockMode = false;

  constructor() {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      this.isMockMode = true;
      this.logger.warn('SMTP credentials not found. Running in MOCK mode. Emails will be logged to console.');
      // Initialize transporter anyway to avoid null errors, but we won't use it in mock mode
      this.transporter = nodemailer.createTransport({ jsonTransport: true });
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (this.isMockMode) {
      this.logger.log('================ [MOCK EMAIL] ================');
      this.logger.log(`TO: ${options.to}`);
      this.logger.log(`SUBJECT: ${options.subject}`);
      this.logger.log('CONTENT (HTML preview):');
      this.logger.log(options.html.substring(0, 500) + '...'); // Log first 500 chars
      this.logger.log('==============================================');
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"Basic Studio" <${process.env.SMTP_USER || 'noreply@basicstudio.com'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      this.logger.log(`Email sent to ${options.to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      return false;
    }
  }

  async sendInviteEmail(
    email: string,
    inviteCode: string,
    courseNames: string[],
  ): Promise<boolean> {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const html = inviteEmailTemplate({
      inviteCode,
      courseNames,
      registerUrl: `${frontendUrl}/cadastro?code=${inviteCode}`,
      whatsappNumber: '+351937299329',
      instagramHandle: '@basic.studio7',
    });

    // Log the full link in dev mode for easy testing
    if (this.isMockMode) {
      this.logger.log(`[MOCK INVITE LINK]: ${frontendUrl}/cadastro?code=${inviteCode}`);
    }

    return this.sendEmail({
      to: email,
      subject: '💅 Seu convite para Basic Studio chegou!',
      html,
    });
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<boolean> {
    const html = this.getWelcomeEmailTemplate(userName);

    return this.sendEmail({
      to: email,
      subject: '🎉 Bem-vinda ao Basic Studio!',
      html,
    });
  }

  private getWelcomeEmailTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f5f7;">
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #d4a5a5 0%, #8b6b8f 100%);">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Bem-vinda, ${userName}! 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Estamos muito felizes em ter você conosco no <strong>Basic Studio</strong>!
              </p>
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Agora você tem acesso aos nossos cursos exclusivos de nail art. 
                Prepare-se para aprender técnicas incríveis e elevar suas habilidades!
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:4200'}/meus-cursos" 
                   style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #d4a5a5 0%, #8b6b8f 100%); color: #ffffff; text-decoration: none; border-radius: 25px; font-weight: 600;">
                  Acessar Meus Cursos
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; background-color: #f8f5f7; text-align: center;">
              <p style="margin: 0 0 10px; color: #666;">Dúvidas? Entre em contato!</p>
              <p style="margin: 0;">
                <a href="https://wa.me/351937299329" style="color: #8b6b8f; text-decoration: none;">📱 WhatsApp</a>
                &nbsp;|&nbsp;
                <a href="https://instagram.com/basic.studio7" style="color: #8b6b8f; text-decoration: none;">📸 @basic.studio7</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}
