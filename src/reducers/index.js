import app from './app';
import posts from './posts';
import user from './user';
import postDetails from './postDetails';

export default {
  ...app,
  ...posts,
  ...user,
  ...postDetails
};
