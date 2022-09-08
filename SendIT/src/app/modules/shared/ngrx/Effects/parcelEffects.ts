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
          map(parcels => parcelActions.loadParcelsSuccess({parcels})),
          catchError(error => of(parcelActions.loadParcelsFailure({ error:error })))
        )
      )
    );
  });
}
