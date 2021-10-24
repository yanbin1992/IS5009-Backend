declare namespace Express {
  interface Request {
    user?: {
      id: number;
      permissions: string[];
      name: string;
      iat: number;
      exp: number;
    };
  }
}
