import { User } from "@/types/user";
import React, { Dispatch, SetStateAction, ReactNode, useState, createContext } from "react";

type UserInfoContextProps = {
    userName: string
    userEmail: string
    setUserEmail: Dispatch<SetStateAction<string>>,
    setUserName: Dispatch<SetStateAction<string>>,
}


const UserContext = createContext<UserInfoContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{ userName, userEmail, setUserEmail, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within an UserProvider');
    }
    return context;
};