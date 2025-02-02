import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthState } from "../types/authTypes";
import { authService, googleAuthService } from "@authService";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";


type GoogleSignInParams = {
  loginType: "google";
};

type FirebaseSignInParams = {
  loginType: "email_and_password";
  email: string;
  password: string;
};

type LoginParams = FirebaseSignInParams | GoogleSignInParams;

type AuthContextType = {
  authState: AuthState;
  login: (loginParams: LoginParams) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    googleAuthService.configureGoogleSignIn();

    const unsubscribe = authService.authChangeListener((firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setAuthState({ user, loading: false });
      } else {
        setAuthState({ user: null, loading: false });
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const login = async (loginParams: LoginParams): Promise<void> => {
    setLoadingState(true);
    let signInMethod: Promise<FirebaseAuthTypes.User>;

    switch (loginParams.loginType) {
      case "email_and_password":
        signInMethod = authService.login(
          loginParams.email,
          loginParams.password
        );
        break;
      case "google":
        signInMethod = googleAuthService.signInWithGoogle();
        break;
    }

    try {
      const user = await signInMethod;
      setAuthState({ user, loading: false });
    } catch (error: any) {
      console.error("Login Failed", error.message);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<void> => {
    setLoadingState(true);
    try {
      const user = await authService.register(email, password, displayName);
      setAuthState({ user, loading: false });
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoadingState(true);
    try {
      await authService.logout();
      setAuthState({ user: null, loading: false });
    } catch (error: any) {
      console.error("Logout failed:", error.message);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const setLoadingState = (isLoading: boolean): void => {
    setAuthState((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
