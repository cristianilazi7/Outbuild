
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
    children: React.ReactNode;
 }

 const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    React.useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <p>Unauthorized</p>;
    }

    return <>{children}</>;
 };

 export default AuthGuard;