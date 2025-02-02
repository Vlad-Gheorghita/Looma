import {
  FirebaseAuthErrorEnum,
  GoogleAuthErrorEnum,
} from '@constants/authEnums';
import { ToastService } from 'services/toaster/toastService';

const IS_DEV = process.env.NODE_ENV === 'development'

const authErrorMessages: Record<string, { title: string; message: string }> = {
  [FirebaseAuthErrorEnum.INVALID_EMAIL]: {
    title: 'Invalid Email',
    message: 'Please enter a valid email address.',
  },
  [FirebaseAuthErrorEnum.USER_DISABLED]: {
    title: 'Account Disabled',
    message: 'This account has been disabled. Contact support.',
  },
  [FirebaseAuthErrorEnum.USER_NOT_FOUND]: {
    title: 'User Not Found',
    message: 'No account found with this email.',
  },
  [FirebaseAuthErrorEnum.WRONG_PASSWORD]: {
    title: 'Wrong Password',
    message: 'The password entered is incorrect.',
  },
  [FirebaseAuthErrorEnum.EMAIL_NOT_AVAILABLE]: {
    title: 'Invalid Email',
    message: 'An account with this email already exists.',
  },
  [GoogleAuthErrorEnum.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]: {
    title: 'Account Exists',
    message:
      'An account with this email already exists but was created with a different login method.',
  },
  [GoogleAuthErrorEnum.INVALID_CREDENTIAL]: {
    title: 'Invalid Credential',
    message:
      'The provided credential is either malformed or has expired. Please try again.',
  },
  [GoogleAuthErrorEnum.OPERATION_NOT_ALLOWED]: {
    title: 'Operation Not Allowed',
    message:
      'This type of authentication is currently disabled. Please contact support.',
  },
  [GoogleAuthErrorEnum.INVALID_VERIFICATION_CODE]: {
    title: 'Invalid Code',
    message:
      'The verification code entered is incorrect. Please check and try again.',
  },
  [GoogleAuthErrorEnum.INVALID_VERIFICATION_ID]: {
    title: 'Invalid Verification ID',
    message:
      'The verification ID provided is not valid. Please request a new one and try again.',
  },
};

export const handleAuthError = (errorCode: string) => {
  const error = authErrorMessages[errorCode];

  if (error) {
    ToastService.error(error.title, error.message);
  } else {
    ToastService.error('Authentication Error', 'An unexpected error occurred.');
  }

  if(IS_DEV){
    console.error(errorCode);
  }
};
