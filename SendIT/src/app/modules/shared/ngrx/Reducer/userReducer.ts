import { state } from "@angular/animations";
// import { Actions } from "@ngrx/effects";
import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { user1 } from "src/app/interfaces/interfaces";
import * as Actions from '../Actions/userActions'


export interface userState{
    clientID: number
    client:user1 | null
    users: user1[]
    userError: string
    
}

const initialState: userState={
    clientID: 0,
    client:null,
    users: [],
    userError:''
}

const getUsersFeatureState = createFeatureSelector<userState>('user')

export const getUsers = createSelector(
    getUsersFeatureState,
    state=>state.users
)

export const getClientID = createSelector(
    getUsersFeatureState,
    state=>state.clientID
)

export const getClient = createSelector(
    getUsersFeatureState,
    getClientID,
    (state, id)=>state.users.find(client=>client.clientID === id)
)

export const userReducer= createReducer(
    initialState,
    on(createAction('ON_LOAD'), (state):userState=>{
        return {...state, users:state.users}
    }),
    on(Actions.getUsersSuccess, (state, action):userState=>{
        return {...state, users:action.users}
    }),
    on(Actions.getUsersFailure, (state, action):userState=>{
        return {...state, userError:action.error}
    })
)