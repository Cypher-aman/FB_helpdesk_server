import JWT from 'jsonwebtoken';

export default class JWTServices {
  static generateSigninToken(id: string, email: string) {
    return JWT.sign(
      {
        id,
        email,
      },
      process.env.JWT_SECRET as string
    );
  }

  static verifySigninToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET as string);
  }
}
