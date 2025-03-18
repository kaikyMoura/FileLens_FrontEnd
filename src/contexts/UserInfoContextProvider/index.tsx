import React, { Dispatch, SetStateAction, ReactNode, useState, createContext } from "react";

type UserInfoContextProps = {
    user_name: string,
    email: string,
    setUser_name: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>
}

const UserContext = createContext<UserInfoContextProps | undefined>(undefined)

export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider value={{ user_name, setUser_name, email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
}

export const usePageContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('usePageContext must be used within an PageProvider');
    }
    return context;
};