
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { listenToConnectedUsers, removeUserPresence, setUserPresence } from "@/app/services/connectUser";
import { setConnectedUsers } from "@/store/slices/userSlice";
import { ConnectedUser } from "@/app/interface/connectedUser";

interface AuthGuardProps {
    children: React.ReactNode;
 }

 const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
    const router = useRouter();
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (user.uid) {
           setUserPresence(user.uid, user.email || 'Anonymous');

           const handleBeforeUnload = () => {
                removeUserPresence(user.uid!);
           };

           window.addEventListener('beforeunload', handleBeforeUnload);

           return () => {
            removeUserPresence(user.uid!);
            window.removeEventListener('beforeunload', handleBeforeUnload);
           };
        }
    }, [user.uid, user.email]);

    useEffect(() => {
        const unsubscribe = listenToConnectedUsers((connectedUsers: ConnectedUser[]) => {
            dispatch(setConnectedUsers(connectedUsers));
        });
    
        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <p>Unauthorized</p>;
    }

    return <>{children}</>;
 };

 export default AuthGuard;