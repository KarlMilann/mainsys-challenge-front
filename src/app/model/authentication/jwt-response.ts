/**
 * localStorage info saved into local storage when the user is logged in
 */
export class JwtResponse {
  public accessToken: string;
  public type: string;
  public username: string;
  public authorities: string[];
}
