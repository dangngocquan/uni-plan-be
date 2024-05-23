import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqSignUpDto } from './dto/req.signup.dto';
import { ResTokenDto } from './dto/res.token.dto';
import { ReqLoginDto } from './dto/req.login.dto';
import { ReqRefreshTokenDto } from './dto/req.refresh-token.dto';
import { ReqGoogleTokenDto } from './dto/req.gg-token.dto';
import { ReqForgotPasswordDto } from './dto/req.forgot-password.dto';
import { ResMailDto } from '../mail/dto/mail-reponse.dto';
import { ReqResetPasswordDto } from './dto/req.reset-password.dto';
import { ReqVerifyEmailDto } from './dto/req.verify-email.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({
    description: 'User sign up.',
    type: ResMailDto,
  })
  async signup(@Body() dto: ReqSignUpDto): Promise<ResMailDto> {
    return await this.authService.signup(dto);
  }

  @Post('verify-signup')
  @ApiOkResponse({
    description: 'Verify email when user sign up.',
    type: ResTokenDto,
  })
  async verifySignup(@Body() dto: ReqVerifyEmailDto): Promise<ResTokenDto> {
    return this.authService.verifySignup(dto);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'User login.',
    type: ResTokenDto,
  })
  async login(@Body() dto: ReqLoginDto): Promise<ResTokenDto> {
    return await this.authService.login(dto);
  }

  @Post('refresh-token')
  @ApiOkResponse({
    description: 'Refresh token.',
    type: ResTokenDto,
  })
  async refreshToken(@Body() dto: ReqRefreshTokenDto): Promise<ResTokenDto> {
    return await this.authService.refreshToken(dto);
  }

  @Post('google')
  @ApiOkResponse({
    description: 'Auth google.',
    type: ResTokenDto,
  })
  async authGoogle(@Body() dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
    return await this.authService.authGoogle(dto);
  }

  // @Post('login-google')
  // @ApiOkResponse({
  //   description: 'User login by google.',
  //   type: ResTokenDto,
  // })
  // async loginByGoogle(@Body() dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
  //   return await this.authService.loginByGoogle(dto);
  // }

  // @Post('signup-google')
  // @ApiOkResponse({
  //   description: 'User signup by google.',
  //   type: ResTokenDto,
  // })
  // async signupByGoogle(@Body() dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
  //   return await this.authService.signupByGoogle(dto);
  // }

  @Post('forgot-password')
  @ApiOkResponse({
    description: 'Forget password.',
    type: ResMailDto,
  })
  async forgotPassword(@Body() dto: ReqForgotPasswordDto): Promise<ResMailDto> {
    return await this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @ApiOkResponse({
    description: 'Reset password.',
    type: ResTokenDto,
  })
  async resetPassword(@Body() dto: ReqResetPasswordDto): Promise<ResTokenDto> {
    return await this.authService.resetPassword('as', dto);
  }
}
