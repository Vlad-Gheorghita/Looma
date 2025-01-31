import { ProviderEnum } from '@constants/authEnums';
import auth, {
  CallbackOrObserver,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User> => await logIn(email, password),

  register: async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<FirebaseAuthTypes.User> =>
    await register(email, password, displayName),

  logout: async (): Promise<void> => await logOut(),

  authChangeListener: (
    observer: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>
  ) => authChangeListener(observer),
};

export const googleAuthService = {
  configureGoogleSignIn: (): void => configureGoogleSignIn(),

  signInWithGoogle: async (): Promise<FirebaseAuthTypes.User> =>
    await signInWithGoogle(),
};

const register = async (
  email: string,
  password: string,
  displayName?: string
): Promise<FirebaseAuthTypes.User> => {
  const result = await auth().createUserWithEmailAndPassword(email, password);

  if (displayName && result.user) {
    await result.user.updateProfile({ displayName });
    await result.user.reload();
  }

  return result.user;
};

const logOut = async (): Promise<void> => {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    console.log('No user is currently signed in');
  }

  await auth().signOut();

  const providerId = currentUser!.providerData[0]?.providerId;
  if (providerId === ProviderEnum.google) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }
};

const logIn = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> => {
  const result = await auth().signInWithEmailAndPassword(email, password);

  return result.user;
};

const configureGoogleSignIn = (): void => {
  GoogleSignin.configure({
    webClientId:
      '990211081673-2o4i2lnq3kk4revm3515s5inqjgnvtod.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

const signInWithGoogle = async (): Promise<FirebaseAuthTypes.User> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  let signInResult = await GoogleSignin.signIn();

  const idToken = signInResult.data?.idToken;

  if (!idToken) {
    throw new Error('No ID token found');
  }
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  const result = await auth().signInWithCredential(googleCredential);

  return result.user;
};

const authChangeListener = (
  observer: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>
) => auth().onAuthStateChanged(observer);
