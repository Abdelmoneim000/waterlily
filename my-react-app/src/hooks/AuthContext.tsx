import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/AuthTypes';

const AuthContext = createContext<null | AuthContextType>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for token and load user data on initial mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Option 1: If you have a /me endpoint
                    const response = await fetch("http://localhost:3000/api/me", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                    } else {
                        // Token is invalid, clear it
                        localStorage.removeItem("token");
                    }
                } catch (error) {
                    console.error("Error loading user:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    async function logOut() {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
