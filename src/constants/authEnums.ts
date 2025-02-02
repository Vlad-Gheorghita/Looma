export enum ProviderEnum {
  google = 'google.com',
  firebase = 'password',
}

export enum FirebaseAuthErrorEnum {
  INVALID_EMAIL = 'auth/invalid-email',
  USER_DISABLED = 'auth/user-disabled',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  EMAIL_NOT_AVAILABLE = 'auth/email-already-in-use'
}

export enum GoogleAuthErrorEnum {
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed',
  INVALID_VERIFICATION_CODE = 'auth/invalid-verification-code',
  INVALID_VERIFICATION_ID = 'auth/invalid-verification-id',
}
