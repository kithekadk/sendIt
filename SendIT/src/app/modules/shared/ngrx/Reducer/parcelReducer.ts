import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { parcel } from "src/app/interfaces/parcelInterfaces"
import * as Actions from '../Actions/parcelActions'



export interface parcelState{
    parcelID: number
    parcel:parcel | null
    parcels: parcel[]

    parceladdSuccess:string
    parceladdFailure:string

    loadParcSuccess:parcel[]
    loadParcFailure:string
}

const initialParcelState: parcelState={
    parcelID: 0,
    parcel: null,
    parcels:[],

    parceladdSuccess: "",
    parceladdFailure: "",

    loadParcSuccess: [],
    loadParcFailure: "",
}

const getParcelsFeatureState = createFeatureSelector<parcelState>('parcel')


export const createNewParcel = createSelector(
    getParcelsFeatureState,
    state=>state.parcel
)

export const getParcels = createSelector(
    getParcelsFeatureState,
    state=>state.loadParcSuccess
)

export const getparcelID = createSelector(
    getParcelsFeatureState,
    state => state.parcelID
)

export const getOneParcel = createSelector(
    getParcelsFeatureState,
    getparcelID,
    (state, id) => state.parcels.find((parcel) => parcel.parcelID === id)
  );
  
export const parcelReducer= createReducer(
   initialParcelState,
    on(Actions.createParcelSuccess, (state, action):parcelState=>{
        return {...state, parceladdSuccess:action.message}
    }),
    on(Actions.createParcelFailure, (state, action):parcelState=>{
        return {...state, parceladdFailure:action.error}
    }),

    /**
     * load parcel state
     */
    
    on(Actions.loadParcelsSuccess, (state, action):parcelState=>{
        return{...state, loadParcSuccess:action.parcels}
    }),
    on(Actions.loadParcelsFailure, (state, action):parcelState=>{
        return{...state, loadParcFailure:action.error}
    })
    
)
