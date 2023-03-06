import { ActionReducerMapBuilder, createAsyncThunk, createSlice, isRejected, isRejectedWithValue,current } from "@reduxjs/toolkit";
import { IMember, IMemberEdit } from "../../types/types";
import {getMembers,postMembers,deleteMembers,editMembers, getMember} from '../../services/members'
import { RootState } from "../index";

interface IState{
    members : IMember[];
    loading : "pending"|"idle"|"succeded"|"rejected";
    editModal : boolean; 
    addModal : boolean;
    currentMemberId : string,
    member : IMember
}

const initialState = {
    members : [],
    member : {},
    loading : "idle",
    editModal: false,
    addModal: false,
    currentMemberId: ""
} as IState


export const fetchMembers = createAsyncThunk(
    "members/fetchMembers",
    async () => {
        const res =  await getMembers();
        return res.data;
    }
)

export const fetchMember = createAsyncThunk(
    "members/fetchMember",
    async (id:string) => {
        const res =  await getMember(id);
        return res.data;
    }
)

export const postMembers_ = createAsyncThunk(
    "members/postMembers",
    async (data:IMember,{rejectWithValue}) => {
        try{
            const res =  await postMembers(data)
            return res.data;
        }
        catch(err){
            return rejectWithValue((err as Error).message)
        }
    }
)

export const editMembers_ = createAsyncThunk(
    "members/editMembers",
    async (data:any,{rejectWithValue}) => {
        try{
            const res =  await editMembers(data)
            return res.data;
        }
        catch(err){
            return rejectWithValue((err as Error).message)
        }
    }
)
interface IData{
    id:string;
}
export const deleteMembers_ = createAsyncThunk(
    "members/deleteMembers",
    async (data:IData,{rejectWithValue}) => {
        try{
            const res =  await deleteMembers(data)
            return res.data;
        }
        catch(err){
            return rejectWithValue((err as Error).message)
        }
    }
)


export const toggleScrollbar =  () =>{
    const element = document.getElementsByTagName("body")[0];
           
    if(element.classList.contains('overflow-hidden')){
        element.classList.remove('overflow-hidden')
    }
    else  element.classList.add('overflow-hidden')
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers : {
        toggleEditModal: (state) : void => {
        
           state.editModal = !state.editModal
           toggleScrollbar();
           
        },
        toggleAddModal: (state) : void => {
            state.addModal = !state.addModal
           toggleScrollbar();
         },
         updateCurrentMember : (state:any,action:any) : void => {
           state.currentMemberId = action.payload;
            // // console.log(state.currentMember)
         }
    },
    extraReducers : (builder:ActionReducerMapBuilder<IState>) => {
        builder
        .addCase(fetchMembers.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.members = action.payload;
            state.loading ="success"
        })
        .addCase(fetchMembers.pending,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'pending'
        })
        .addCase(fetchMembers.rejected,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'rejected'
        })
        .addCase(fetchMember.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.member = action.payload;
            state.loading ="success"
        })
        .addCase(fetchMember.pending,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'pending'
        })
        .addCase(fetchMember.rejected,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'rejected'
        })
        .addCase(postMembers_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.members = action.payload;
            state.loading ="success"
        })
        .addCase(postMembers_.pending,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'pending'
        })
        .addCase(postMembers_.rejected,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'rejected'
        })
        .addCase(editMembers_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.members = action.payload;
            state.loading ="success"
        })
        .addCase(editMembers_.pending,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'pending'
        })
        .addCase(editMembers_.rejected,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'rejected'
        })
        .addCase(deleteMembers_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.members = action.payload;
            state.loading ="success"
        })
        .addCase(deleteMembers_.pending,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'pending'
        })
        .addCase(deleteMembers_.rejected,(state:any,action:any)=>{
            // state.members = action;
            state.loading = 'rejected'
        })

    }
})

export const {toggleAddModal,toggleEditModal,updateCurrentMember} =  membersSlice.actions;

export const selectCurrentMember = (state: RootState) => state.members.member;
export const selectAddModal = (state: RootState)=> state.members.addModal;
export const selectEditModal = (state: RootState)=> state.members.editModal;
export const selectCurrentMemberId  = (state: RootState)=> state.members.currentMemberId;
export const selectMembers = (state : RootState) => state.members.members;
export const selectLoading= (state: RootState)=> state.members.loading;

export default membersSlice.reducer;
