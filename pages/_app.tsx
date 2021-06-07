import type { AppProps } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import LoginAppBar from '../src/components/specific/LoginAppBar/LoginAppBar';

const appBarHeight = '64px';

const useStyles = makeStyles({
  main: {
    marginTop: appBarHeight,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <LoginAppBar appBarHeight={appBarHeight} />
      <Container className={classes.main}>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
