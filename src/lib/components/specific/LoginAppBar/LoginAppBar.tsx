import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { signIn } from './../../../../functions/authHandler';

const LoginAppBar = ({ appBarHeight }) => {
  const useStyles = makeStyles({
    root: {
      height: appBarHeight,
    },

    menu: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
    },
  });

  const classes = useStyles();

  const handleClick = () => signIn('test12345@gmail.com', 'test1234');

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.menu}>
        <Typography>Logo</Typography>
        <Button variant="contained" onClick={handleClick}>
          Login/Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default LoginAppBar;
