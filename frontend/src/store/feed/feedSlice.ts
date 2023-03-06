import { ActionReducerMapBuilder, createAsyncThunk, createSlice, isRejected, isRejectedWithValue,current } from "@reduxjs/toolkit";
import { IFeed } from "../../types/types";
import {getFeeds,postFeed,deleteFeed,editFeed, getFeed} from '../../services/feed'
import { RootState } from "../index";
import { toggleScrollbar } from "../members/membersSlice";

interface IState{
    feeds : IFeed[];
    loading : "pending"|"idle"|"success"|"rejected";
    editModal : boolean; 
    addModal : boolean;
    currentFeedId : string,
    feed : IFeed
}

const initialState = {
    feeds : [],
    feed : {},
    loading : "idle",
    editModal: false,
    addModal: false,
    currentFeedId: ""
} as IState


export const fetchFeeds = createAsyncThunk(
    "feeds/fetchFeeds",
    async () => {
        const res =  await getFeeds();
        return res.data;
    }
)

export const fetchFeed = createAsyncThunk(
    "feeds/fetchFeed",
    async (id:string) => {
        const res =  await getFeed(id);
        return res.data;
    }
)

export const postFeeds_ = createAsyncThunk(
    "feeds/postFeeds",
    async (data:IFeed,{rejectWithValue}) => {
        try{
            const res =  await postFeed(data)
            return res.data;
        }
        catch(err){
            // console.log(err)
            return rejectWithValue((err as Error).message)
        }
    }
)

export const editFeeds_ = createAsyncThunk(
    "feeds/editFeeds",
    async (data:any,{rejectWithValue}) => {
        try{
            const res =  await editFeed(data)
            return res.data;
        }
        catch(err:any){
            // console.log('called inside feed slice')
            return rejectWithValue((err).response)
        }
    }
)
interface IData{
    id:string;
}
export const deleteFeeds_ = createAsyncThunk(
    "feeds/deleteFeeds",
    async (data:IData,{rejectWithValue}) => {
        try{
            const res =  await deleteFeed(data)
            return res.data;
        }
        catch(err){
            return rejectWithValue((err as Error).message)
        }
    }
)




const feedsSlice = createSlice({
    name: 'feeds',
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
         updateCurrentFeed : (state:any,action:any) :void => {
           state.currentFeedId = action.payload;
            // // console.log(state.currentFeed)
         }
    },
    extraReducers : (builder:ActionReducerMapBuilder<IState>) => {
        builder
        .addCase(fetchFeeds.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.feeds = action.payload;
            state.loading ="success"
        })
        .addCase(fetchFeeds.pending,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'pending'
        })
        .addCase(fetchFeeds.rejected,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'rejected'
        })
        .addCase(fetchFeed.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.feed = action.payload;
            state.loading ="success"
        })
        .addCase(fetchFeed.pending,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'pending'
        })
        .addCase(fetchFeed.rejected,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'rejected'
        })
        .addCase(postFeeds_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.feeds = action.payload;
            state.loading ="success"
        })
        .addCase(postFeeds_.pending,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'pending'
        })
        .addCase(postFeeds_.rejected,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'rejected'
        })
        .addCase(editFeeds_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.feeds = action.payload;
            state.loading ="success"
        })
        .addCase(editFeeds_.pending,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'pending'
        })
        .addCase(editFeeds_.rejected,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'rejected'
        })
        .addCase(deleteFeeds_.fulfilled,(state:any,action:any)=>{
            //// console.log(action.payload)
            state.feeds = action.payload;
            state.loading ="success"
        })
        .addCase(deleteFeeds_.pending,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'pending'
        })
        .addCase(deleteFeeds_.rejected,(state:any,action:any)=>{
            // state.feeds = action;
            state.loading = 'rejected'
        })

    }
})

export const {toggleAddModal,toggleEditModal,updateCurrentFeed} =  feedsSlice.actions;

export const selectCurrentFeed = (state: RootState) => state.feeds.feed;
export const selectAddModal = (state: RootState)=> state.feeds.addModal;
export const selectEditModal = (state: RootState)=> state.feeds.editModal;
export const selectCurrentFeedId  = (state: RootState)=> state.feeds.currentFeedId;
export const selectFeeds = (state : RootState) => state.feeds.feeds;
export const selectLoading= (state: RootState)=> state.feeds.loading;

export default feedsSlice.reducer;
