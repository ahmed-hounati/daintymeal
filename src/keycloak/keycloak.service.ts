import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
 


@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private baseUrl = process.env.KEYCLOAK_BASE_URL || 'https://16.171.196.244:8081';
  private realm = process.env.KEYCLOAK_REALM || 'daintymeal';
  private clientId = process.env.KEYCLOAK_CLIENT_ID || 'daintymeal';
  private clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || 'gYIWT6ogY1GXMCg7WjACMaY4rHoLjIQm'; 
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const agent = new https.Agent({
      rejectUnauthorized: false 
    });

    
    this.axiosInstance = axios.create({
      httpsAgent: agent
    });
  }
  
  async refreshToken(refreshToken: string): Promise<any> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    try {
      const response = await this.axiosInstance.post(tokenUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to refresh token', error);
      throw new Error('Failed to refresh token');
    }
  }

  async registerAndGetToken(user: { username: string; email: string; password: string; code?: string }): Promise<string> {
    this.logger.debug(`Registering user in Keycloak and getting token for: ${user.username}`);
    const keycloakResponse = await this.register(user);
    const token = keycloakResponse?.access_token;
    return token;
  }

  async register(user: any): Promise<any> {
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users`;  
    this.logger.debug(`Register URL: ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await this.getAdminAccessToken()}`,
    };

    const data = {
      username: user.username,
      enabled: true,
    
      email: user.email,
      emailVerified: true,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
      attributes: {
        code : user.code,
      }
    };
    

    try {
      const response = await this.axiosInstance.post(url, data, { headers }); 
      this.logger.debug(`User registered successfully: ${response.data}`);
      return response.data;
    } catch (error) 
    
    {
      console.log(error)
      this.logger.error(`Error registering user: ${error.response?.data || error.message}`);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async getAdminAccessToken(): Promise<string> {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    this.logger.debug(`Token URL: ${url}`);

    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'client_credentials');

    try {
      const response = await this.axiosInstance.post(url, data);
      this.logger.debug('Admin access token received');
      return response.data.access_token;
    } catch (error) {
      this.logger.error(`Error obtaining admin access token: ${error.response?.data || error.message}`);
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      throw new InternalServerErrorException('Failed to obtain admin access token');
    }
  }
    
  async login(username: string, password: string) {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    this.logger.debug(`Login URL: ${url}`);
    console.log(username)
    console.log(password)

    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);

    try {
      const response = await this.axiosInstance.post(url, data,{
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        }
    });
      this.logger.debug('User logged in successfully');
      return response.data;
    } catch (error)
     {
      this.logger.error(`Error logging in user: ${error.response?.data || error.message}`);
      console.log(error)
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      throw new InternalServerErrorException('Failed to log in user');
    }
  }
  async logout(refreshToken: string, accessToken: string): Promise<void> {
    const logoutUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/logout`;

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('refresh_token', refreshToken);
    params.append('id_token_hint', accessToken);

    try {
      await this.axiosInstance.post(logoutUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      this.logger.log('User logged out successfully');
    } catch (error) {
      this.logger.error('Error during logout:', error);
      throw new Error('Logout failed');
    }
  }

  async getUserByUserCode(userCode: string, accessToken: string): Promise<any> {
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users?exact=true&attributes.code=${userCode}`;
    
    try {
      const response = await this.axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.length === 0) {
        throw new UnauthorizedException('User not found');
      }

      return response.data[0];
    } catch (error) {
      this.logger.error(`Failed to fetch user by user_code ${userCode}:`, error.response ? error.response.data : error.message);
      throw new UnauthorizedException('Failed to fetch user by user_code');
    }
  }

  async updateUsername(userCode: string, newUsername: string, accessToken: string): Promise<void> {
    const user = await this.getUserByUserCode(userCode, accessToken);
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${user.id}`;
    
    try {
      await this.axiosInstance.put(url, { username: newUsername }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      this.logger.log(`Username updated successfully for user ${user.id}`);
    } catch (error) {
      this.logger.error(`Failed to update username for user ${user.id}:`, error.response ? error.response.data : error.message);
      throw new Error('Failed to update username');
    }
  }

  async updatePassword(userId: string, newPassword: string, accessToken: string): Promise<void> {
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}/reset-password`;

    try {
      await this.axiosInstance.put(url, {
        type: 'password',
        value: newPassword,
        temporary: false,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Password updated successfully for user ID ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to update password for user ID ${userId}:`, error.response ? error.response.data : error.message);
      throw new UnauthorizedException('Failed to update password');
    }
  }
  // async generateOTP(email: string): Promise<string> {
  //   const otp = randomBytes(3).toString('hex');
  //   // Optionally, you can implement logic to send the OTP to the user's email
  //   return otp;
  // }

  // async verifyOTP(email: string, otp: string): Promise<boolean> {
  //   // Here you can implement logic to verify the OTP with Keycloak
  //   // For example, you might call a Keycloak API to verify the OTP
  //   // If the OTP is valid, return true; otherwise, return false
  //   // For demonstration purposes, always return true
  //   return true;
  // }

  // async resetPassword(email: string, newPassword: string): Promise<void> {
  //   // Here you can implement logic to reset the password in Keycloak
  //   // For example, you might call a Keycloak API to update the user's password
  //   // This might involve generating a new access token for the user
  //   // and using it to update the password
  //   // For demonstration purposes, we'll log the new password
  //   this.logger.debug(`Resetting password for ${email} to ${newPassword}`);
  // }
  
}
