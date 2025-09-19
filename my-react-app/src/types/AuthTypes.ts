export interface User {
    id: string;
    name: string;
    email: string;
    token: string | null;
}

export interface LoginData {
    email: string;
    password: string;
    token?: string | null;
    
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => Promise<void>;
    loading: boolean;
}