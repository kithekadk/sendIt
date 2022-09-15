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


/**
 * get one parcel
 */

export const SelectedId = createAction('getOneParcel',
props<{parcelID:number}>()
)
/**
 * Deleting a parcel
 */
export const deleteParcel = createAction('deleteParcel',
props<{id:number}>()
)
export const delParcelSuccess = createAction(
  'delParcelSuccess',
  props<{message: string}>()
)
export const delParcelFailure = createAction(
  'delParcelFailure',
  props<{error: string}>()
)

/**
 * EDITING A PARCEL
 */
export const editParcel = createAction('editParcel',
props<{id:number, parcel:parcel}>()
)
export const editParcelSuccess = createAction('editParcelSuccess',
props<{message: string}>()
)
export const editParcelFailure = createAction('editParcelFailure',
props<{error: string}>()
)

/**
 * UPDATING PARCEL STATUS E.G DELIVERED
 */
export const  reviseStatus = createAction('reviseStatus',
props<{id:number, status:string}>()
)
export const reviseStatusSuccess = createAction('reviseStatusSuccess',
props<{message: string}>()
)
export const reviseStatusFailure = createAction('reviseStatusFailure',
props<{error: string}>()
)
