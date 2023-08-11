export interface ISecurityPayload {
  id: number;
  email: string;
  username: string;
}

export interface ILoginResponse {
  accessToken: string;
}
