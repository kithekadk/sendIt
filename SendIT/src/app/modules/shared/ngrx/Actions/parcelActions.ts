import { createAction, props } from "@ngrx/store";
import { parcel } from "src/app/interfaces/parcelInterfaces";


export const createParcel = createAction('createParcel',
props<{parcel:parcel}>()
)
export const createParcelSuccess = createAction('createParcelSuccess',
props<{message: string}>()
)
export const createParcelFailure = createAction('createParcelFailure',
props<{error:string}>()
)