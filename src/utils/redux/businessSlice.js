import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const savedBusinessName = localStorage.getItem('businessName') || "";

const initialState = {
    businessList: [],
    businessName: savedBusinessName,
    loading: false,
    error: null,
};

export const getBusinessName = createAsyncThunk(
    'business/getBusinessName',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://apibiri.eazydevz.in/api/getBusinessName');
            return { businessList: response.data.business }; // Ensure this is an array
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch business names");
        }
    }
);

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusinessName: (state, action) => {
            state.businessName = action.payload;
            localStorage.setItem('businessName', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBusinessName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBusinessName.fulfilled, (state, action) => {
                state.loading = false;
                state.businessList = action.payload.businessList;
            })
            .addCase(getBusinessName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBusinessName } = businessSlice.actions;
export default businessSlice.reducer;
