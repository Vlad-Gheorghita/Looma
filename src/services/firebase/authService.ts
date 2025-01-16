import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth"


export const register = (email: string, password: string) : Promise<FirebaseAuthTypes.UserCredential> => {
    return auth().createUserWithEmailAndPassword(email,password);
}

export const logOut = () => {
    return auth().signOut();
}
