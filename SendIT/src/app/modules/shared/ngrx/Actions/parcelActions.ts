import { createAction, props } from '@ngrx/store';
import { parcel } from 'src/app/interfaces/parcelInterfaces';

/**
 * CREATING A NEW PARCEL
 */
export const createParcel = createAction(
  'createParcel',
  props<{ parcel: parcel }>()
);
export const createParcelSuccess = createAction(
  'createParcelSuccess',
  props<{ message: string }>()
);
export const createParcelFailure = createAction(
  'createParcelFailure',
  props<{ error: string }>()
);

/**
 * FETCHING PARCELS
 */
export const loadParcels = createAction('loadParcels');

export const loadParcelsSuccess = createAction(
  'loadParcelsSuccess',
  props<{ parcels: parcel[] }>()
);

export const loadParcelsFailure = createAction(
  'loadParcelsFailure',
  props<{ error: string }>()
);
