import app from './app';
import github from './github';
import user from './user';
import postDetails from './postDetails';

export default {
  ...app,
  ...github,
  ...user,
  ...postDetails
};
