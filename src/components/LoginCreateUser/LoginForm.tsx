import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../config/firebaseConfig';
import FireBaseAuthResponseHandler from './FireBaseAuthResponseHandler';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Must enter a email'),
  password: Yup.string()
    .min(6, 'Must be longer than 6 character')
    .required('Must enter a password'),
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  button: {
    marginTop: theme.spacing(1),
  },

  hidden: {
    display: 'none',
  },

  errorText: {
    wordWrap: 'break-word',
    maxWidth: '250px',
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

const ValidationMessage = ({ touched, message }) => {
  const isError = Boolean(message);
  return (
    <FormHelperText error={isError}>
      {touched ? (isError ? message : 'All good') : ''}
    </FormHelperText>
  );
};

const LoginForm = ({ setOpen }) => {
  const classes = useStyles();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (values, setSubmitting) => {
    setSubmitting(true);

    //This function trigger the loading hook, when the loading finishing the FireBaseAuthResponseHandler component will trigger
    signInWithEmailAndPassword(values.email, values.password);
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Log In
      </Typography>

      {/*Formik tutorial: https://www.youtube.com/watch?v=TxEVnaISj1w&t=131s*/}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({
          initialValues,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          resetForm,
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="e-mail"
              id="email"
              onChange={handleChange}
              name="email"
              value={values.email}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
            />
            <ValidationMessage touched={touched.email} message={errors.email} />

            <TextField
              label="password"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
            />
            <ValidationMessage
              touched={touched.password}
              message={errors.password}
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>

            <FormHelperText error className={classes.errorText}>
              {error?.message}
            </FormHelperText>

            <FireBaseAuthResponseHandler
              loading={loading}
              error={error}
              values={values}
              initialValues={initialValues}
              setSubmitting={setSubmitting}
              resetForm={resetForm}
              setOpen={setOpen}
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
