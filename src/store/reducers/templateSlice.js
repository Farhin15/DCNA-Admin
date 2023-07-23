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
export const fetchALLTemplates = createAsyncThunk("template/getAPI", async () => {
    let headers = getHeaders();
    const response = await axios.get(`${url}template/list/`, { headers });
    return response.data.templates;
});
export const fetchTemplateById = createAsyncThunk("template/getAPIById", async (id) => {
    let headers = getHeaders();
    const response = await axios.get(`${url}template/${id}/`, { headers });
    console.log(response);
    return response.data;
});

// export const fetchTemplateById = createAsyncThunk("template/getAPI", async () => {
let headers = getHeaders();
//     const response = await axios.get(`${url}`);
//     return response.data;
// });

export const saveNewTemplate = createAsyncThunk(
    "template/createAPI",
    async (payload) => {
        let headers = getHeaders();
        const response = await axios.post(`${url}template/form/`, payload, { headers });
        return response.data;
    }
);

export const updateTemplate = createAsyncThunk("template/updateAPI", async (payload) => {
    let headers = getHeaders();
    const response = await axios.put(
        `${url}template/form/${payload.id}`,
        payload.data,
        { headers }
    );
    return response.data;
});

export const deleteTemplate = createAsyncThunk("template/deleteAPI", async (id) => {
    let headers = getHeaders();
    const response = await axios.delete(`${url}template/delete/${id}`, { headers });
    return id;
});

const initialState = {
    templateData: [],
    loading: "idle",
};

const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchALLTemplates.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchALLTemplates.fulfilled, (state, action) => {
            state.loading = "idle";
            state.templateData = action.payload.map((x, i) => {
                x['key'] = i + 1;
                return x;
            });
        });
        builder.addCase(fetchTemplateById.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchTemplateById.fulfilled, (state, action) => {
            state.loading = "idle";
            state.templateData = action.payload;
        });
        builder.addCase(saveNewTemplate.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(saveNewTemplate.fulfilled, (state, action) => {
            state.loading = "idle";
            state.templateData = [];
        });
        builder.addCase(saveNewTemplate.rejected, (state, action) => {
            state.loading = "idle";
            state.templateData = [];
        });
        builder.addCase(updateTemplate.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(updateTemplate.fulfilled, (state, action) => {
            state.loading = "idle";
            state.templateData = [];
            // state.templateData.unshift(action.payload);
        });
        builder.addCase(deleteTemplate.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.loading = "idle";
            state.templateData = state.templateData.filter((_) => _.id !== action.payload);
        });
    },
});

export const getAllTemplates = (state) => state.template?.templateData?.length ? state.template?.templateData : [];
export const getLoading = (state) => state.template?.loading ? true : false;
export const gettemplateById = (id) => {
    return (state) => {
        return state.template?.templateData?.filter((_) => _.id === id)[0]
    };
};
export default templateSlice.reducer;
