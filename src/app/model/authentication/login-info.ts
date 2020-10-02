/**
 * authentication info sent to server and checked to match DB infos
 */
export class AuthLoginInfo {
  public username: string;
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
