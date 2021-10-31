import { postEntryTestValidator, postSignInValidator, postSignUpValidator } from './account.validator';
import { getTokenHandler } from './handler/account.getToken';
import { postEntryTestHandler } from './handler/account.postEntryTest';
import { postSignInHandler } from './handler/account.postSignIn';
import { postSignUpHandler } from './handler/account.postSignUp';

export const routes: CommonRoute[] = [
  {
    path: '/signup',
    method: 'post',
    validator: postSignUpValidator,
    handler: postSignUpHandler,
  },
  {
    path: '/signin',
    method: 'post',
    validator: postSignInValidator,
    handler: postSignInHandler,
  },
  {
    path: '/token',
    method: 'get',
    auth: true,
    handler: getTokenHandler,
  },
  {
    path: '/entrytest',
    method: 'post',
    validator: postEntryTestValidator,
    handler: postEntryTestHandler
  },
];
