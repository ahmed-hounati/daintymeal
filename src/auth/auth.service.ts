import { Injectable, UnauthorizedException, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { SignUpEmailDto } from './dto/register-email.dto';
import { LoginEmailDto } from './dto/login-email.dto';
import { v4 as uuidv4 } from 'uuid';
import { KeycloakService } from 'src/keycloak/keycloak.service';
import { CloudinaryService } from 'src/cloudinary.service';
import { jwtDecode } from 'jwt-decode';
import { randomBytes } from 'crypto';

// interface UserWithOTP extends User {
//   otp: string;
// }
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private keycloakService: KeycloakService,
    private cloudinaryService: CloudinaryService,
  ) { }

  async signUp(signUpEmailDto: SignUpEmailDto): Promise<{ message: string }> {
    const {fullname, email, password } = signUpEmailDto;
    console.log(email)
    console.log(password)
    try {
      const code = uuidv4();
      console.log("le code est:", code)
      const token = await this.keycloakService.registerAndGetToken({ username: email, email, password, code });

      let imageUrl = 'https://res.cloudinary.com/dz4pww2qv/image/upload/v1719590751/eylkigghkfmwmjlqhdm9.png';
      // if (image) {
      //   const cloudinaryResult = await this.cloudinaryService.uploadImage(image, 'Snaati');
      //   imageUrl = cloudinaryResult.secure_url;
      // }

      const user = await this.userModel.create({
        name: `${fullname} ` ,
        email,
        fullname,
        user_code: code,
        avatar: imageUrl,
      });
      const access_token = {
        message: "User registered successfully"
      }
      return access_token;
    } catch (error) {
      console.log("error:", error),
        this.logger.error('Error during signup:', JSON.stringify(error, null, 2));
      throw new InternalServerErrorException('Signup failed , email already existe');
    }
  }

  async login(loginEmailDto: LoginEmailDto): Promise<any> {
    const { username, password } = loginEmailDto;
  
    try {
      const keycloakResponse = await this.keycloakService.login(username, password);
      const jwt = jwtDecode<any>(keycloakResponse.access_token);
      
      console.log('Access Token:', keycloakResponse.access_token);
      console.log('Decoded JWT:', jwt);
  
      const code = jwt.code;
      console.log('User Code:', code);
  
      const user = await this.findUserByCode(code);
      return { user, ...keycloakResponse };
    } catch (error) {
      this.logger.error('Error during login:', error);
      throw new UnauthorizedException(error.message || 'Incorrect email or password');
    }
  }
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const keycloakResponse = await this.keycloakService.refreshToken(refreshToken);
      const { access_token, refresh_token, id_token } = keycloakResponse;

      const jwt = jwtDecode<any>(keycloakResponse.access_token);
      
      console.log('Access Token:', keycloakResponse.access_token);
      console.log('Decoded JWT:', jwt);
  
      const code = jwt.code;

      // Find the user by the decoded code
      const user = await this.findUserByCode(code);

      return { user, access_token, refresh_token, id_token };
    } catch (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }
  }
  async findUserByCode(code: string): Promise<User> {
    const user = await this.userModel.findOne({ user_code: code }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async logout(refreshToken: string, accessToken: string): Promise<void> {
    try {
      await this.keycloakService.logout(refreshToken, accessToken);
      this.logger.log('User logged out successfully');
    } catch (error) {
      this.logger.error('Error during logout:', error);
      throw new UnauthorizedException('Logout failed');
    }
  }
  async updateUsername(userCode: string, newUsername: string, accessToken: string): Promise<void> {
    try {
      await this.keycloakService.updateUsername(userCode, newUsername, accessToken);

      const user = await this.userModel.updateOne({
        email : newUsername,
 
      });
      this.logger.log(`Username updated successfully for user with user_code ${userCode}`);
    } catch (error) {
      this.logger.error(`Error updating username for user with user_code ${userCode}:`, error);
      throw new UnauthorizedException('Failed to update username');
    }
  }
  async updatePassword(userCode: string, newPassword: string, accessToken: string): Promise<void> {
    try {
      // Fetch user details to get userId
      const user = await this.keycloakService.getUserByUserCode(userCode, accessToken);
      const userId = user.id;

      // Update user password
      await this.keycloakService.updatePassword(userId, newPassword, accessToken);

      this.logger.log(`Password updated successfully for user with user_code ${userCode}`);
    } catch (error) {
      this.logger.error(`Error updating password for user with user_code ${userCode}:`, error);
      throw new UnauthorizedException('Failed to update password');
    }
  }
  
  // async forgotPassword(email: string): Promise<any> {
  //   const otp = await this.keycloakService.generateOTP(email);
  //   console.log(`Generated OTP for ${email}: ${otp}`);
  // }

  // async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
  //   const isOTPValid = await this.keycloakService.verifyOTP(email, otp);
  //   if (!isOTPValid) {
  //     throw new NotFoundException('Invalid OTP');
  //   }
  //   await this.keycloakService.resetPassword(email, newPassword);
  // }
}

