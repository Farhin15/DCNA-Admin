import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let url = process.env.REACT_APP_API_BASE_URL
console.log(url);
// url = url.replace(/";/, '')
const getHeaders = () => {
    let headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Y_TOKEN'))}` }
    console.log(headers);
    return headers;
}
export const fetchALLRequests = createAsyncThunk("request/getAPI", async () => {
    let headers = getHeaders();
    const response = await axios.get(`${url}request/list/`, { headers });
    return response.data.data;
});
export const fetchRequestById = createAsyncThunk("request/getAPIById", async (id) => {
    let headers = getHeaders();
    const response = await axios.get(`${url}request/details/${id}`, { headers });
    return response.data;
});

// export const fetchRequestById = createAsyncThunk("request/getAPI", async () => {
let headers = getHeaders();
//     const response = await axios.get(`${url}`);
//     return response.data;
// });

export const saveNewRequest = createAsyncThunk(
    "request/createAPI",
    async (payload) => {
        let headers = getHeaders();
        const response = await axios.post(`${url}request`, payload);
        return response.data;
    }
);

export const updateRequest = createAsyncThunk("request/updateAPI", async (payload) => {
    let headers = getHeaders();
    const response = await axios.put(
        `${url}request`,
        payload
    );
    return response.data;
});

export const deleteRequest = createAsyncThunk("request/deleteAPI", async (id) => {
    let headers = getHeaders();
    const response = await axios.delete(`${url}request/${id}`);
    return id;
});

const initialState = {
    requestData: [],
    loading: "idle",
};

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchALLRequests.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchALLRequests.fulfilled, (state, action) => {
            state.loading = "idle";
            state.requestData = action.payload.map((x, i) => {
                x['key'] = i + 1;
                return x;
            });
        });
        builder.addCase(fetchRequestById.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchRequestById.fulfilled, (state, action) => {
            state.loading = "idle";
            state.requestData = action.payload;
        });
        builder.addCase(saveNewRequest.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(saveNewRequest.fulfilled, (state, action) => {
            state.loading = "idle";
            state.requestData = [];
        });
        builder.addCase(saveNewRequest.rejected, (state, action) => {
            state.loading = "idle";
            state.requestData = [];
        });
        builder.addCase(updateRequest.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(updateRequest.fulfilled, (state, action) => {
            state.loading = "idle";
            state.requestData = [];
            state.requestData.unshift(action.payload);
        });
        builder.addCase(deleteRequest.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(deleteRequest.fulfilled, (state, action) => {
            state.loading = "idle";
            state.requestData = state.requestData.filter((_) => _.id !== action.payload);
        });
    },
});

export const getAllRequests = (state) => state.request?.requestData?.length ? state.request?.requestData : [];
export const getLoading = (state) => state.request?.loading;
export const getrequestById = (id) => {
    return (state) => {
        return state.request?.requestData?.filter((_) => _.id === id)[0]
    };
};
export default requestSlice.reducer;
