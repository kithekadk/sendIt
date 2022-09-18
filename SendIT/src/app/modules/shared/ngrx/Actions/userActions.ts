import { createAction, props } from '@ngrx/store';
import {
  loginMessage,
  user,
  UserInfo,
  userReg,
} from 'src/app/interfaces/interfaces';
import { data } from '../../interfaces/interfaces';

/**
 * fetching users/clients from db
 */

export const loadUsers = createAction('loadUsers');

export const getUsersSuccess = createAction(
  'getUsersSuccess',
  props<{ users: user[] }>()
);

export const getUsersFailure = createAction(
  'getUsersFailure',
  props<{ error: string }>()
);

/**
 * Registering a new user
 */

export const addUser = createAction('addUser', props<{ newUser: userReg }>());

export const addUserSuccess = createAction(
  'addUserSuccess',
  props<{ addUsuccess: string }>()
);

export const addUserFailure = createAction(
  'addUserFailure',
  props<{ error: string }>()
);

/**
 * LOGIN a user
 */

export const loginUser = createAction('loginUser', props<{ logins: data }>());

export const loginUserSuccess = createAction(
  'loginUserSuccess',
  props<{ loginMessage: string}>()
);

export const loginUserFailure = createAction(
  'loginUserFailure',
  props<{ error: string }>()
);

/**
 * Checking user role
 */
export const loadRole = createAction('loadRole');

export const loadRoleSuccess = createAction(
  'loadRoleSuccess',
  props<{ role: string }>()
);

export const loadRoleFailure = createAction(
  'loadRoleFailure',
  props<{ error: string }>()
);

/**
 * UPDATING a user
 */
export const updateUser = createAction('updateUser',
props<{userID:number, user:user}>()
)

export const updateUserSuccess = createAction('updateUserSuccess',
props<{message:string}>()
)
export const updateUserFailure = createAction('updateUserFailure',
props<{error:string}>()
)

export function getUsers(arg0: { id: any; parcel: any; }): any {
  throw new Error('Function not implemented.');
}
