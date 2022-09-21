import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import * as parcelActions from '../Actions/parcelActions';

@Injectable({
  providedIn: 'root',
})
export class parcelEffects {
  constructor(
    private api: ApiService,
    private actions: Actions,
    private actions$: Actions,
    private store:Store
  ) {}

  createParcel = createEffect(() => {
    return this.actions$.pipe(
      ofType(parcelActions.createParcel),
      mergeMap((action) =>
        this.api.createParcel(action.parcel).pipe(
          tap(()=>this.store.dispatch(parcelActions.loadParcels())),
          map((res) =>
            parcelActions.createParcelSuccess({message: res.message})
          ),
          catchError((error) =>
            of(parcelActions.createParcelFailure({ error }))
          )
        )
      )
    );
  });

  loadParcels = createEffect(() => {
    return this.actions.pipe(
      ofType(parcelActions.loadParcels),
      mergeMap(() =>
        this.api.getAllParcels().pipe(
          map((parcels) => parcelActions.loadParcelsSuccess({ parcels })),
          catchError((error) =>
            of(parcelActions.loadParcelsFailure({ error: error }))
          )
        )
      )
    );
  });

  delParcel = createEffect(() => {
    return this.actions.pipe(
      ofType(parcelActions.deleteParcel),
      mergeMap((action) =>
        this.api.deleteParcel(action.id).pipe(
          tap(()=>this.store.dispatch(parcelActions.loadParcels())),
          map((message) =>
            parcelActions.delParcelSuccess({ message: message.message })
          ),
          catchError((error) =>
            of(parcelActions.delParcelFailure({ error: error }))
          )
        )
      )
    );
  });

  editParcel = createEffect(() => {
    return this.actions.pipe(
      ofType(parcelActions.editParcel),
      mergeMap((action) =>
        this.api.editParcel(action.id, action.parcel).pipe(
          tap(()=>this.store.dispatch(parcelActions.loadParcels())),
          map((message) =>
            parcelActions.editParcelSuccess({ message: message.message })
          ),
          catchError((error) =>
            of(parcelActions.editParcelFailure({ error: error }))
          )
        )
      )
    );
  });

  updateParcelStatus = createEffect(() => {
    return this.actions.pipe(
      ofType(parcelActions.reviseStatus),
      mergeMap((action) =>
        this.api.updateParcelStatus(action.id, action.status).pipe(
          tap(()=>this.store.dispatch(parcelActions.loadParcels())),
          map((message) =>
            parcelActions.reviseStatusSuccess({ message: message.message })
          ),
          catchError((error) =>
            of(parcelActions.reviseStatusFailure({ error: error }))
          )
        )
      )
    );
  });
}
