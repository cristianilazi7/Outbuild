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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                </form>
                
            </div>
        </div>

    );
};

export default LoginForm;