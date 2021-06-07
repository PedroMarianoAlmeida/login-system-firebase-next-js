import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../../config/firebaseConfig';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  button: {
    marginTop: theme.spacing(1),
  },
}));

const SignInForm = () => {
  const classes = useStyles();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const createAccount = () =>
    createUserWithEmailAndPassword('email3@gmail.com', 'password12345');

  return (
    <>
      <Typography variant="h4" align="center">
        Sign In
      </Typography>

      <form className={classes.form}>
        <TextField label="e-mail" />
        <TextField label="password" />
        <TextField label="confirm password" />
        <Button variant="contained" color="primary" className={classes.button}>
          Create Account
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
