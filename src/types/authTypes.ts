export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type AuthState = {
  user: User | null; // `null` when logged out
  loading: boolean; // Indicates if authentication is being initialized or in progress
};
