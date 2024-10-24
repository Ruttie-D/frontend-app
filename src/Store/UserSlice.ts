import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";

const initialState = {
    // userName: '',
    user: JSON.parse(localStorage.getItem('user') || 'null') as TUser | null,
    isLoggedIn: localStorage.getItem('logged in') === 'true'
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
         // ACTIONS
        login: (state: TUserState, data: PayloadAction<TUser>) => {
            // state.userName = (data.payload).userName;
            state.user = data.payload;
            state.isLoggedIn = true;
            localStorage.setItem('logged in', "true");
        },
        logout: (state: TUserState) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('logged in');
            localStorage.removeItem("token");
        },
        updateUser: (state: TUserState, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        }
    }
});

export const userActions = UserSlice.actions;

export type TUserState = typeof initialState;
export type IUserPayLoad = { userName: string };

export default UserSlice.reducer;