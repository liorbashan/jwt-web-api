export interface IAuthProvider {
  authenticate(username: string, password: string): Promise<any>;
}
