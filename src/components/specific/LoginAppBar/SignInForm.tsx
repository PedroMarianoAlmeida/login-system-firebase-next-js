import { useEffect, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../../config/firebaseConfig';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Must enter a email'),
  password: Yup.string()
    .min(4, 'Must be longer than 4 character')
    .required('Must enter a password'),
  confirmPassword: Yup.string()
    .min(4, 'Must be longer than 4 character')
    .required('Must confirm the password'),
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
}));

const ValidationMessage = ({ touched, message }) => {
  const isError = Boolean(message);
  return (
    <FormHelperText error={isError}>
      {touched ? (isError ? message : 'All good') : ''}
    </FormHelperText>
  );
};

const SignInForm = ({ setOpen }) => {
  const clearModalButton = useRef(null);
  const liberatingFormButton = useRef(null);

  const classes = useStyles();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (values, setSubmitting) => {
    setSubmitting(true);

    if (
      JSON.stringify(values.password) !== JSON.stringify(values.confirmPassword)
    ) {
      values.confirmPassword = '';
      setSubmitting(false);
      return;
    }

    //This function trigger loading, that trigger the useEffect that trigger the hidden button on form
    //That is the way I found to use Formik functions outside the Formik component, all this because this loading hook and not the usual async await and try catch structure
    createUserWithEmailAndPassword(values.email, values.password);
  };

  const clearModal = (values, initialValues, setSubmitting, resetForm) => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      setSubmitting(false);
      resetForm();
      setOpen(false);
      console.log('User Created');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!error) {
        clearModalButton.current.click();
      }
      liberatingFormButton.current.click();
    }
  }, [loading]);

  return (
    <>
      <Typography variant="h4" align="center">
        Sign In
      </Typography>

      {/*Formik tutorial: https://www.youtube.com/watch?v=TxEVnaISj1w&t=131s*/}
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
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

            <TextField
              label="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                touched.confirmPassword &&
                (values.confirmPassword !== values.password ||
                  Boolean(errors.confirmPassword))
              }
            />
            <ValidationMessage
              touched={touched.confirmPassword}
              message={
                errors.confirmPassword ||
                (values.confirmPassword !== values.password &&
                  'Password should match')
              }
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={isSubmitting}
            >
              Create Account
            </Button>

            <FormHelperText error>{error?.message}</FormHelperText>

            <Button
              className={classes.hidden}
              onClick={() =>
                clearModal(values, initialValues, setSubmitting, resetForm)
              }
              ref={clearModalButton}
            >
              Clear Modal (hidden)
            </Button>

            <Button
              className={classes.hidden}
              onClick={() => setSubmitting(false)}
              ref={liberatingFormButton}
            >
              Liberating Form (hidden)
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
