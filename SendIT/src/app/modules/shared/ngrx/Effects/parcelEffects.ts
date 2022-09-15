import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import * as parcelActions from '../Actions/parcelActions';

@Injectable({
  providedIn: 'root',
})
export class parcelEffects {
  constructor(
    private api: ApiService,
    private actions: Actions,
    private actions$: Actions
  ) {}

  createParcel = createEffect(() => {
    return this.actions$.pipe(
      ofType(parcelActions.createParcel),
      mergeMap((action) =>
        this.api.createParcel(action.parcel).pipe(
          map((res) =>
            parcelActions.createParcelSuccess({ message: res.message })
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
