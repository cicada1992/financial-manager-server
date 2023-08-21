declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_KEY: string;
      PORT: number;
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
