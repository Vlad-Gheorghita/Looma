import auth, {
  CallbackOrObserver,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

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

  authChangeListener: (observer: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>) => authChangeListener(observer)
};

const register = async (
  email: string,
  password: string,
  displayName?: string
): Promise<FirebaseAuthTypes.User> => {
  const result = await auth().createUserWithEmailAndPassword(email, password);

  if (displayName && result.user) {
    await result.user.updateProfile({ displayName });
  }

  return result.user;
};

const logOut = async (): Promise<void> => {
  await auth().signOut();
};

const logIn = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> => {
  const result = await auth().signInWithEmailAndPassword(email, password);

  return result.user;
};

const authChangeListener = (
  observer: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>
) => auth().onAuthStateChanged(observer);
