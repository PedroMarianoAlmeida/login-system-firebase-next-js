import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../src/config/firebaseConfig';

import LoginSignIn from './LoginSignIn';
import UserLogout from './UserLogout';

const UserInteraction = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : user ? (
        <UserLogout />
      ) : (
        <LoginSignIn />
      )}
    </>
  );
};

export default UserInteraction;
