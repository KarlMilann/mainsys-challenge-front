/**
 * user info sent to database
 */
export class SignUpInfo {
  public username: string;
  public role: string[];
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.role = ['user'];
  }
}
