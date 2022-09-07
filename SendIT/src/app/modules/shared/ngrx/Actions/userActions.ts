import { createAction, props } from "@ngrx/store";
import { user } from "src/app/interfaces/interfaces";



export const loadUsers = createAction('loadUsers')

export const getUsersSuccess = createAction('getUsersSuccess',
props<{users:user[]}>()
)


export const getUsersFailure = createAction('getUsersFailure',
props<{error:string}>()
)