import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../src/config/firebaseConfig';

import LoginAndCreateUserModal from './LoginCreateUser/LoginAndCreateUser';
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
        <LoginAndCreateUserModal />
      )}
    </>
  );
};

export default UserInteraction;
