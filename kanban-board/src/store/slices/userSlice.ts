import { ConnectedUser } from '@/app/interface/connectedUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    uid: string | null;
    email: string | null;
    connectedUsers?: ConnectedUser[];
}

const initialState: UserState = {
    uid: null,
    email: null,
    connectedUsers: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
        },
        clearUser(state) {
            state.uid = null;
            state.email = null;
        },
        setConnectedUsers(state, action: PayloadAction<ConnectedUser[]>) {
            state.connectedUsers = action.payload;
        },
    },
});

export const { setUser, clearUser, setConnectedUsers } = userSlice.actions;
export default userSlice.reducer;