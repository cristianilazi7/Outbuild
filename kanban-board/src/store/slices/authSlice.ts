import  { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
    resetAuthError(state) {
      state.error = null;
    },
  },
});


export const {
    authStart,
    authSuccess,
    authFailure,
    logout,
    resetAuthError,
  } = authSlice.actions;
  
  export default authSlice.reducer;