import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: any;
    setUser: (user: any) => void;
    logout: () => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

export const UseAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('UseAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}>
            {children}
        </AppContext.Provider>
    );
};
