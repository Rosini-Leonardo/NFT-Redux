import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api";
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/helpers';

const isQuerySaved = (action) =>{
    return action.type.endsWith('/saveQuery');
};

// define getItem matcher
const path = getLocalStorageItem("query")?.path || "";
const itemPerPage = getLocalStorageItem("query")?.itemPerPage || null;
const type = getLocalStorageItem("query")?.type || "";
const query = getLocalStorageItem("query")?.query || "";

// Redux states
const initialState = {
    loading:true,
    photos:[],
    
    query : {
        type:type,
        path:path,
        query:query,
        itemPerPage:itemPerPage,
    },

    error:{
        status:false,
        message:"",
    },
    
    rate_limit:{
        remaining:null,
        total:50
    },
    
    pagination:{
        currentPage:1,
        totalPages:null,
        hasNextPage:false,
        hasPrevPage:false,
    }
};

const apiSlice = createSlice({
    name:'api',
    initialState,
    
    reducers:{
        startLoading: (state) => { state.loading = true; state.photos = []; }, // 200 OK
        stopLoading: (state) => { state.loading = false; }, // Error
        saveData : (state,action) => { state.photos = action.payload; }, // GET data
        saveQuery: (state,action) => { state.query = { ...action.payload }}, // Save the GET data

        catchError: (state,action) => { // Define the error matched
            state.error.status = true;
            state.error.message = action.payload;
            state.photos = [];
        },
        
        cleanError: (state) => { // Remove the catchError
            state.error.status = false; 
            state.error.message = "";
        },
        
        checkRateLimiter: (state,action) =>{ // Check num of requests
            state.rate_limit = {
                ...action.payload
            }
        },
        
        // Manage pages
        updatePage: (state,action) => { state.pagination.currentPage = action.payload },

        checkPagination : (state,action) => { 
            state.pagination.hasNextPage = action.payload.hasNextPage;
            state.pagination.hasPrevPage = action.payload.hasPrevPage;
            state.pagination.totalPages = action.payload.totalPages;
        },
    },

    extraReducers: (builder) => {
        builder
        .addMatcher(isQuerySaved,state =>{
            setLocalStorageItem('query',state.query);
        })
    }
});

export const fetchData = (path) => async (dispatch,getState) =>{
    dispatch(startLoading()); // start
    dispatch(cleanError()); // Clean the search
    
    try { // Api Request
        const response = await instance.get(path);
        dispatch(saveData(response.data));
        
        if(response?.data?.total === 0){ // Catch error if no results are obtained
            dispatch(catchError(['No photos for the search term']));
            return;
        }

        if(response?.data?.total_pages){
            const { currentPage }  = getState().photos.pagination;
            
            const paginationInfo = {
                hasPrevPage : currentPage > 1,
                hasNextPage : currentPage + 1 <= response?.data?.total_pages,
                totalPages  : response?.data?.total_pages, 
            }
            
            // Check the pagination with the object
            dispatch(checkPagination(paginationInfo));
        }

        dispatch(checkRateLimiter({ 
            total: response.headers['x-ratelimit-limit'], 
            remaining: response.headers['x-ratelimit-remaining']
        }));

    }catch(error){ // match the error
        dispatch(catchError(error.errors)); 
    }
    dispatch(stopLoading()); // End of fetching
};

const { reducer } = apiSlice;
const { 
    startLoading,
    stopLoading,
    checkRateLimiter,
    // Error 
    cleanError,
    catchError,
    // save
    saveData,
    saveQuery,
    // pages
    updatePage,
    checkPagination,
} = apiSlice.actions;

export{
    cleanError,
    catchError,
    saveQuery,
    updatePage
};

export default reducer;