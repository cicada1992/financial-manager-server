declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OAUTH_GOOGLE_ID: string;
      OAUTH_GOOGLE_SECRET: string;
      OAUTH_GOOGLE_REDIRECT: string;
      JWT_KEY: string;
      PORT: number;
    }
  }
}

export {};
