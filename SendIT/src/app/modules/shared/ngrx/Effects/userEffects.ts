import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import * as userActions from '../Actions/userActions'

@Injectable({
    providedIn: 'root'
})
export class userEffects{

    constructor(private actions:Actions, private api:ApiService){}

    loadUsers = createEffect(()=>{
        return this.actions.pipe(
            ofType(userActions.loadUsers),
            mergeMap(()=>this.api.getUsers().pipe(
                map(users=> userActions.getUsersSuccess({users})),
                catchError(error=>of(userActions.getUsersFailure({error:error})))
            ))
        )
    })
}