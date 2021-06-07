import { auth } from '../config/firebaseConfig';

export const signIn = async (email, password) => {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  console.log(cred.user.uid);
};
