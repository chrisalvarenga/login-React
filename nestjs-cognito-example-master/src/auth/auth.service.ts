import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthCredentialsDto, AuthRegisterDto, AuthConfirmCredentialsDto, AuthUserOperationDto, AuthConfirmPasswordDto } from './auth.interface';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private configService: ConfigService
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('auth.UserPoolId'),
      ClientId: this.configService.get<string>('auth.ClientId') 
    });
  }

  get secretKey() {
    return this.configService.get<string>('auth.SecretKey');
  }

  async register(authRegisterRequest: AuthRegisterDto) {
    const { email, password } = authRegisterRequest;
    return new Promise(((resolve, reject) => {
      return this.userPool.signUp(email, password, [
        new CognitoUserAttribute({ Name: 'email', Value: email })
      ], null, (err, result) => {
        if (!result) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    }));
  }

  async authenticateUser(user: AuthCredentialsDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise(((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: ((err) => {
          reject(err);
        }),
      });
    }));
  }

  async ConfirmUser(user: AuthConfirmCredentialsDto) {
    const { name, code } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    return new Promise(((resolve, reject) => {
      return newUser.confirmRegistration(code, false,
        (result) => {
          resolve(result);
      });
    }));
  }

  async ResendConfirmation(user: AuthUserOperationDto) {
    const { name } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    return new Promise(((resolve, reject) => {
      return newUser.resendConfirmationCode((result) => {
          resolve(result);
      });
    }));
  }

  async ForgotPassword(user: AuthUserOperationDto) {
    const { name } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    return new Promise(((resolve, reject) => {
      return newUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (result) => {
          reject(result);
        }
      });
    }));
  }

  async ConfirmForgotPassword(user: AuthConfirmPasswordDto) {
    const { name, code, password } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    return new Promise(((resolve, reject) => {
      return newUser.confirmPassword(code, password, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (result) => {
          reject(result);
        }
      });
    }));
  }
}