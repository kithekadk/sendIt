import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loginMessage, user, user1 } from 'src/app/interfaces/interfaces';
import * as Actions from '../Actions/userActions';

export interface userState {
  clientID: number;
  client: user1 | null;
  users: user[];

  userError: string;
  useraddMessage: string;
  userAdderror: string;

  loginSuccess: string;
  loginFailure: string;

  roleCheckSuccess: string;
  roleCheckFailure: string;

  updateUserSuccess:string;
  updateUserFailure:string;

  changePwdSuccess: string;
  changePwdFailure:string;
}

const initialState: userState = {
  clientID: 0,
  client: null,
  users: [],
  userError: '',
  useraddMessage: '',
  userAdderror: '',

  loginSuccess: '',
  loginFailure: '',

  roleCheckSuccess: '',
  roleCheckFailure: '',

  updateUserSuccess:'',
  updateUserFailure:'',

  changePwdSuccess: '',
  changePwdFailure: '',
};

const getUsersFeatureState = createFeatureSelector<userState>('user');

export const getUsers = createSelector(
  getUsersFeatureState,
  (state) => state.users
);

export const getClientID = createSelector(
  getUsersFeatureState,
  (state) => state.clientID
);

export const getClient = createSelector(
  getUsersFeatureState,
  getClientID,
  (state, id) => state.users.find((client) => client.clientID === id)
);

export const signUpUser = createSelector(
  getUsersFeatureState,
  (state) => state.client
);

export const getToken = createSelector(
  getUsersFeatureState,
  (state) => state.loginSuccess
);

export const userAdderror= createSelector(
  getUsersFeatureState,
  (state)=> state.userAdderror
)
export const useraddSuccess = createSelector(
  getUsersFeatureState,
  (state)=>state.useraddMessage
)

export const userLoginSuccess = createSelector(
  getUsersFeatureState,
  (state)=> state.loginSuccess
)
export const userLoginFailure = createSelector(
  getUsersFeatureState,
  (state)=> state.loginFailure
)
/**
 * change password selectors
 */
export const changePassSuccess = createSelector(
  getUsersFeatureState,
  (state)=> state.changePwdSuccess
)

export const changePassFailure = createSelector(
  getUsersFeatureState,
  (state)=> state.changePwdFailure
)

/**
 * update user profile selectors
 */
export const userUpdateSuccess = createSelector(
  getUsersFeatureState,
  (state)=>state.updateUserSuccess
)
export const userUpdateFailure = createSelector(
  getUsersFeatureState,
  (state)=>state.updateUserFailure
)



export const userReducer = createReducer(
  initialState,

  on(Actions.getUsersSuccess, (state, action): userState => {
    return { ...state, users: action.users };
  }),
  on(Actions.getUsersFailure, (state, action): userState => {
    return { ...state, userError: action.error };
  }),

  /**
   * Register user status check
   */
  on(Actions.addUserSuccess, (state, action): userState => {
    return { ...state, useraddMessage: action.addUsuccess };
  }),
  on(Actions.addUserFailure, (state, action): userState => {
    return { ...state, userAdderror: action.error };
  }),
  /**
   * Login User status check
   */
  on(Actions.loginUserSuccess, (state, action): userState => {
    return { ...state, loginSuccess: action.loginMessage};
  }),
  on(Actions.loginUserFailure, (state, action): userState => {
    return { ...state, loginFailure: action.error };
  }),
  /**
   * Check role status check
   */
  on(Actions.loadRoleSuccess, (state, action): userState => {
    return { ...state, roleCheckSuccess: action.role };
  }),
  on(Actions.loadRoleFailure, (state, action): userState => {
    return { ...state, roleCheckFailure: action.error };
  }),
  /**
   * update user profile
   */
  on(Actions.updateUserSuccess, (state, action):userState=>{
    return {...state, updateUserSuccess:action.message};
  }),
  on(Actions.updateUserFailure, (state, action):userState=>{
    return {...state, updateUserFailure:action.error};
  }),

  /**
   * change password
   */

  on(Actions.changePwdSuccess, (state, action):userState=>{
    return {...state, changePwdSuccess:action.message};
  }),

  on(Actions.changePwdFailure, (state, action):userState=>{
    return {...state, changePwdFailure:action.error}
  }),

  /**
   * Empty reducer
   */
  // on(Actions.changePwdFailure, (state, action):userState=>{
  //   return { ...state, changePwdFailure:''}
  // }),
)
