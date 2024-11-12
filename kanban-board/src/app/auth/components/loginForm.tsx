"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser } from "../services/authService";
import { AppDispatch, RootState } from "../../../store/store";
import { authStart, authFailure, authSuccess } from '../../../store/slices/authSlice';
import { useRouter } from "next/navigation"; 
import { setUser } from "@/store/slices/userSlice";


const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(authStart());
        try {
            const userData = await dispatch(loginUser({ email, password })).unwrap();
            dispatch(setUser(userData));
            dispatch(authSuccess());
            router.push('/dashboard');
        } catch (err) {
            dispatch(authFailure((err as Error).message || 'Invalid email or password'));
        }
    };

    return (
        <div>
             <h2>Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;