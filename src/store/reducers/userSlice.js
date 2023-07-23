import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let url = process.env.REACT_APP_API_BASE_URL
console.log(url);
// url = url.replace(/";/, '')
console.log(localStorage.getItem('Y_TOKEN'));

const getHeaders = () => {
    let headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Y_TOKEN'))}` }
    console.log(headers);
    return headers;
}
export const fetchALLUsers = createAsyncThunk("user/getAPI", async () => {
    let headers = getHeaders();
    const response = await axios.get(`${url}user/list/`, { headers });
    return response.data.users;
});
export const fetchUserById = createAsyncThunk("user/getAPIById", async (id) => {
    let headers = getHeaders();
    const response = await axios.get(`${url}user/${id}/`, { headers });
    console.log(response);
    return response.data;
});

// export const fetchUserById = createAsyncThunk("user/getAPI", async () => {
//     const response = await axios.get(`${url}`);
//     return response.data;
// });

export const saveNewUser = createAsyncThunk(
    "user/createAPI",
    async (payload) => {
        let headers = getHeaders();
        const response = await axios.post(`${url}sign-up/`, payload, { headers });
        return response.data;
    }
);

export const updateUser = createAsyncThunk("user/updateAPI", async (payload) => {
    let headers = getHeaders();
    const response = await axios.put(
        `${url}user/update/${payload.id}/`,
        payload.data,
        { headers }
    );
    return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteAPI", async (id) => {
    let headers = getHeaders();
    const response = await axios.delete(`${url}user/delete/${id}`, { headers });
    return id;
});

const initialState = {
    userData: [],
    loading: "idle",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchALLUsers.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchALLUsers.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = action.payload.map((x, i) => {
                x['key'] = i + 1;
                return x;
            });
        });
        builder.addCase(fetchUserById.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = action.payload;
        });
        builder.addCase(saveNewUser.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(saveNewUser.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = [];
        });
        builder.addCase(saveNewUser.rejected, (state, action) => {
            state.loading = "idle";
            state.userData = [];
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = [];
            // state.userData.unshift(action.payload);
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = state.userData.filter((_) => _.id !== action.payload);
        });
    },
});

export const getAllUsers = (state) => state.user?.userData?.length ? state.user?.userData : [];
export const getLoading = (state) => state.user?.loading ? true : false;
export const getuserById = (id) => {
    return (state) => {
        return state.user?.userData?.filter((_) => _.id === id)[0]
    };
};
export default userSlice.reducer;
