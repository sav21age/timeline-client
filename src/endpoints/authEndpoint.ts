export default class AuthService {
  static refresh() {
    return `/auth/refresh`;
  }

  static signIn() {
    return `/auth/sign-in`;
  }

  static signOut() {
    return `/auth/sign-out`;
  }

  static signUp() {
    return `/auth/sign-up`;
  }

  static accountActivate(code: string) {
    return `/auth/account/activate/${code}`;
  }

  static accountActivateResendCode() {
    return `/auth/account/activate/resend`;
  }

  static passwordRecovery() {
    return `/auth/password/recovery`;
  }

  static passwordRecoveryCodeVerify(code: string) {
    return `/auth/password/reset/${code}`;
  }

  static setNewPassword() {
    return `/auth/password/reset`;
  }
}