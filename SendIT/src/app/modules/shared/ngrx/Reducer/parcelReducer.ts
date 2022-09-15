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

    deletParcelSuccess:string
    deletParcelFailure: string

    editParcelSuccess:string
    editParcelFailure:string

    reviseStatusSuccess:string
    reviseStatusFailure:string
}

const initialParcelState: parcelState={
    parcelID: 0,
    parcel: null,
    parcels:[],

    parceladdSuccess: "",
    parceladdFailure: "",

    loadParcSuccess: [],
    loadParcFailure: "",

    deletParcelSuccess:'',
    deletParcelFailure: '',

    editParcelSuccess: '',
    editParcelFailure: '',

    reviseStatusSuccess:'',
    reviseStatusFailure: '',
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

export const deleteParcel = createSelector(
    getParcelsFeatureState,
    state=>state.deletParcelSuccess
)

export const editParcel = createSelector(
    getParcelsFeatureState,
    state=>state.editParcelSuccess
)

export const getOneParcel = createSelector(
    getParcelsFeatureState,
    getparcelID,
    (state, id) => state.parcels.find(el =>el.parcelID === id))
  
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
    }),
    /**
     * delete parcel
     */
    on(Actions.delParcelSuccess, (state, action):parcelState=>{
        return{...state, deletParcelSuccess:action.message}
    }),
    on(Actions.delParcelFailure, (state, action):parcelState => {
        return{...state, deletParcelFailure: action.error}
    }),
    /**
     * update parcel
     */

    on(Actions.editParcelSuccess, (state, action):parcelState => {
        return{...state, editParcelSuccess: action.message}
    }),
    on(Actions.editParcelFailure, (state, action):parcelState => {
        return{...state, editParcelFailure:action.error}
    }),
    /**
     * revising status eg delivered
     */
    on(Actions.reviseStatusSuccess, (state, action):parcelState => {
        return{...state, reviseStatusSuccess: action.message}
    }),
    on(Actions.reviseStatusFailure, (state, action):parcelState => {
        return{...state, reviseStatusFailure:action.error}
    })


)
