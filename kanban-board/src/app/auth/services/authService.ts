import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { email, password } = credentials;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { uid: userCredential.user.uid, email: userCredential.user.email };

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);