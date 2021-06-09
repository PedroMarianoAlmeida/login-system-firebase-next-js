import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../config/firebaseConfig';
import FireBaseAuthResponseHandler from './FireBaseAuthResponseHandler';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Must enter a email'),
  password: Yup.string()
    .min(6, 'Must be longer than 6 character')
    .required('Must enter a password'),
  confirmPassword: Yup.string()
    .min(6, 'Must be longer than 6 character')
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

const CreateUserForm = ({ setOpen }) => {
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

    //This function trigger the loading hook, when the loading finishing the FireBaseAuthResponseHandler component will trigger
    createUserWithEmailAndPassword(values.email, values.password);
  };

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

export default CreateUserForm;
