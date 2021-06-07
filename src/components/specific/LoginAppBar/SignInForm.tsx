import Button from '@material-ui/core/Button';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../../config/firebaseConfig';

const SignInForm = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const createAccount = () =>
    createUserWithEmailAndPassword('email3@gmail.com', 'password12345');

  return (
    <Button variant="contained" onClick={createAccount}>
      Create Account
    </Button>
  );
};

export default SignInForm;
