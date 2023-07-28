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
export const fetchALLCommunications = createAsyncThunk("communication/getAPI", async (request_id) => {
    let headers = getHeaders();
    const response = await axios.get(`${url}communication/all/?request_id=${request_id}`, { headers });
    return response.data.communications;
});
export const fetchCommunicationById = createAsyncThunk("communication/getAPIById", async (id) => {
    let headers = getHeaders();
    const response = await axios.get(`${url}communication/${id}/`, { headers });
    console.log(response);
    return response.data;
});

// export const fetchCommunicationById = createAsyncThunk("communication/getAPI", async () => {
let headers = getHeaders();
//     const response = await axios.get(`${url}`);
//     return response.data;
// });

export const saveNewCommunication = createAsyncThunk(
    "communication/createAPI",
    async (payload) => {
        let headers = getHeaders();
        const response = await axios.post(`${url}communication/create/`, payload, { headers });
        return response.data;
    }
);

export const updateCommunication = createAsyncThunk("communication/updateAPI", async (payload) => {
    let headers = getHeaders();
    const response = await axios.put(
        `${url}communication/form/${payload.id}/`,
        payload.data,
        { headers }
    );
    return response.data;
});

export const deleteCommunication = createAsyncThunk("communication/deleteAPI", async (id) => {
    let headers = getHeaders();
    const response = await axios.delete(`${url}communication/delete/${id}/`, { headers });
    return id;
});

const initialState = {
    communicationData: [],
    loading: "idle",
};

const communicationSlice = createSlice({
    name: "communication",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchALLCommunications.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchALLCommunications.fulfilled, (state, action) => {
            state.loading = "idle";
            state.communicationData = action.payload.map((x, i) => {
                x['key'] = i + 1;
                return x;
            });
        });
        builder.addCase(fetchCommunicationById.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchCommunicationById.fulfilled, (state, action) => {
            state.loading = "idle";
            state.communicationData = action.payload;
        });
        builder.addCase(saveNewCommunication.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(saveNewCommunication.fulfilled, (state, action) => {
            state.loading = "idle";
            state.communicationData = [];
        });
        builder.addCase(saveNewCommunication.rejected, (state, action) => {
            state.loading = "idle";
            state.communicationData = [];
        });
        builder.addCase(updateCommunication.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(updateCommunication.fulfilled, (state, action) => {
            state.loading = "idle";
            state.communicationData = [];
            // state.communicationData.unshift(action.payload);
        });
        builder.addCase(deleteCommunication.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(deleteCommunication.fulfilled, (state, action) => {
            state.loading = "idle";
            state.communicationData = state.communicationData.filter((_) => _.id !== action.payload);
        });
    },
});

export const getAllCommunications = (state) => state.communication?.communicationData?.length ? state.communication?.communicationData : [];
export const getLoading = (state) => state.communication?.loading ? true : false;
export const getcommunicationById = (id) => {
    return (state) => {
        return state.communication?.communicationData?.filter((_) => _.id === id)[0]
    };
};
export default communicationSlice.reducer;
