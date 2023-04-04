import { ObjectId } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

//create the custom error handler  class and  export  it from  the  error-handler.ts  file
export class CustomError {
  status: string;
  message: string;
  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }
}
export class UserSuccessMessage {
  status: string;
  message: string;
  user: User;
  constructor(status: string, message: string, user: User) {
    this.status = status;
    this.message = message;
    this.user = user;
  }
}
export class UserVerificationMessage {
  status: string;
  message: string;
  userID: ObjectId;
  constructor(status: string, message: string, userID: ObjectId) {
    this.status = status;
    this.message = message;
    this.userID = userID;
  }
}
export class UserLoginTokenMessage {
  status: string;
  message: string;
  token: string;
  constructor(status: string, message: string, token: string) {
    this.status = status;
    this.message = message;
    this.token = token;
  }
}
export class UserData {
  status: string;
  message: string;
  data: any;
  constructor(status: string, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
