import AWS from 'aws-sdk';
import crypto from 'crypto'
import { APP_CONFIG } from '../../config/appConfig';
import { ResetPasswordType } from './auth.types';

class AuthService {
  private config = {
    region: APP_CONFIG.get('aws_credentials').AWS_REGION,
  }

  private secretHash = APP_CONFIG.get('aws_credentials').AWS_COGNITO_SECRET_HASH;
  private clientId = APP_CONFIG.get('aws_credentials').AWS_COGNITO_CLIENT_ID;

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
  }

  public async signUpUser(email: string, password: string, userAttr: Array<any>) {
    // using Username parameters to take email in here as intentional as required in function
    const params = {
      ClientId: this.clientId || '',
      Password: password,
      Username: email,
      SecretHash: this.hashSecret(email),
      UserAttributes: userAttr,
    }

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      }
    }
  }

  public async signInUser(email: string, password: string) {
    // using Username parameters to take email in here as intentional as required in function
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId || '',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(email),
      },
    }

    try {
      const data = await this.cognitoIdentity.initiateAuth(params).promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  public async forgotPassword(email: string) {
    try {
      const data = await this.cognitoIdentity.forgotPassword({
        ClientId: this.clientId || '',
        Username: String(email),
        SecretHash: this.hashSecret(email),
      }).promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      }
    }
  }

  public async resetPassword(resetPasswordParams: ResetPasswordType) {
    const resetPassword = {
      Password: resetPasswordParams.password,
      ConfirmationCode: resetPasswordParams.confirmationCode,
      Username: String(resetPasswordParams.email),
      ClientId: this.clientId || '',
      SecretHash: this.hashSecret(resetPasswordParams.email),
    }
    try {
      const data = await this.cognitoIdentity.confirmForgotPassword(resetPassword)
        .promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      }
    }
  }

  private hashSecret(email: string): string {
    return crypto.createHmac('SHA256', this.secretHash || '')
      .update(email + this.clientId)
      .digest('base64')
  }
}

export default new AuthService();
