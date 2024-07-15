import { Controller, Post, Body, Get, NotFoundException, Headers, Patch, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpEmailDto } from './dto/register-email.dto';
import { LoginEmailDto } from './dto/login-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup-email')
  async signUp(@Body() signUpEmailDto: SignUpEmailDto): Promise<{ message: string }> {
    console.log('Received SignUp request:', signUpEmailDto); 
    return this.authService.signUp(signUpEmailDto);
  }

  @Post('/login-email')
  async login(@Body() loginEmailDto: LoginEmailDto): Promise<{ token: string }> {
    console.log('Received Login request:', loginEmailDto);
    return this.authService.login(loginEmailDto);
  }
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string, @Body('accessToken') accessToken: string): Promise<void> {
    return this.authService.logout(refreshToken, accessToken);
  }
  @Patch('update-username')
  async updateUsername(@Body('userCode') userCode: string, @Body('newUsername') newUsername: string, @Headers('Authorization') authHeader: string): Promise<{ message: string }> {
    const accessToken = authHeader.replace('Bearer ', '');
    try {
      await this.authService.updateUsername(userCode, newUsername, accessToken);
      return { message: 'Username updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update username', HttpStatus.UNAUTHORIZED);
    }
  }
  @Post('update-password')
  async updatePassword(
    @Body('userCode') userCode: string,
    @Body('newPassword') newPassword: string,
    @Body('accessToken') accessToken: string,
  ): Promise<void> {
    try {
      await this.authService.updatePassword(userCode, newPassword, accessToken);
    } catch (error) {
      throw new UnauthorizedException('Failed to update password');
    }
  }
  // @Post('forgot-password')
  // async forgotPassword(@Body('email') email: string): Promise<{ message: string; otp: string }> {
  //   const otp = await this.authService.forgotPassword(email);
  //   // Optionally, you can send a success response back to the client
  //   return {
  //     message: 'Password reset instructions and OTP have been sent to your email.',
  //     otp: otp
  //   };
  // }


  // @Post('reset-password')
  // async resetPassword(@Body('email') email: string, @Body('otp') otp: string, @Body('newPassword') newPassword: string): Promise<void> {
  //   await this.authService.resetPassword(email, otp, newPassword);
  //   // Optionally, you can send a success response back to the client
  // }

}