import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import * as userActions from '../Actions/userActions'

@Injectable({
    providedIn: 'root'
})
export class userEffects{

    constructor(private actions:Actions, private api:ApiService, private actions$:Actions){}

    loadUsers = createEffect(()=>{
        return this.actions.pipe(
            ofType(userActions.loadUsers),
            mergeMap(()=>this.api.getUsers().pipe(
                map(users=> userActions.getUsersSuccess({users})),
                catchError(error=>of(userActions.getUsersFailure({error:error})))
            ))
        )
    })

    addUser$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(userActions.addUser),
            mergeMap(action=>
                this.api.createUser(action.newUser).pipe(
                map(res=> userActions.addUserSuccess({addUsuccess:res.message})),
                catchError(error=> of(userActions.addUserFailure({error}))))))
    })

    login = createEffect(()=>{
        return this.actions.pipe(
            ofType(userActions.loginUser),
            mergeMap((action)=>this.api.loginUser(action.logins).pipe(
                map(res => userActions.loginUserSuccess({loginMessage:res.token})),
                catchError(error=> of(userActions.loginUserFailure({error})))
            ))
        )
    })

    role = createEffect(()=>{
        return this.actions.pipe(
            ofType(userActions.loadRole),
            mergeMap(()=>this.api.checkUserRole().pipe(
                map(role=>userActions.loadRoleSuccess({role:role})),
                catchError(error=> of(userActions.loadRoleFailure({error})))
            ))
        )})

}