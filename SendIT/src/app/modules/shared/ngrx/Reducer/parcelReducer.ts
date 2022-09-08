import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { parcel } from "src/app/interfaces/parcelInterfaces"
import * as Actions from '../Actions/parcelActions'



export interface parcelState{
    parcelID: number
    parcel:parcel | null
    parcels: parcel[]

    parceladdSuccess:string
    parceladdFailure:string

}

const initialParcelState: parcelState={
    parcelID: 0,
    parcel: null,
    parcels:[],

    parceladdSuccess: "",
    parceladdFailure: "",
}

const getParcelsFeatureState = createFeatureSelector<parcelState>('parcel')


export const createNewParcel = createSelector(
    getParcelsFeatureState,
    state=>state.parcel
)
export const parcelReducer= createReducer(
   initialParcelState,
    on(Actions.createParcelSuccess, (state, action):parcelState=>{
        return {...state, parceladdSuccess:action.message}
    }),
    on(Actions.createParcelFailure, (state, action):parcelState=>{
        return {...state, parceladdFailure:action.error}
    })
)