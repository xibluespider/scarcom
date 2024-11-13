import { CredentialsSignin } from "next-auth";

export default class AuthCredentialsError extends CredentialsSignin {
  constructor(code) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
    this.status = 404;
    this.ok = false;
  }
}
