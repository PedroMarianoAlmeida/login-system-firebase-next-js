import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../src/config/firebaseConfig';

const useStyles = makeStyles((theme) => ({
  logOut: {
    marginLeft: theme.spacing(1),
    color: 'white',
  },
}));

const UserLogout = () => {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Typography display="inline">{user.email}</Typography>
      <IconButton className={classes.logOut}>
        <ClearIcon onClick={() => auth.signOut()} />
      </IconButton>
    </Box>
  );
};

export default UserLogout;
