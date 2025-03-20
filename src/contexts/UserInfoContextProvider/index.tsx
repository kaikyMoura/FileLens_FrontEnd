import { User } from "@/model/User";
import React, { Dispatch, SetStateAction, ReactNode, useState, createContext } from "react";

type UserInfoContextProps = {
    user: Omit<User, 'id' | 'user_password' | 'createdAt' | 'updatedAt'> | null,
    setUser: Dispatch<SetStateAction<User | null>>,
}

const UserContext = createContext<UserInfoContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Omit<User, 'id' | 'user_password' | 'createdAt' | 'updatedAt'> | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
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