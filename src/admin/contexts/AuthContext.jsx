import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("admin_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("admin_user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login — replace with POST /api/auth/login later
        if (email === "admin@thetechspace.com" && password === "admin123") {
            const userData = {
                name: "Daniel K.",
                email,
                role: "Administrator",
                token: "mock-jwt-token-12345",
            };
            setUser(userData);
            localStorage.setItem("admin_user", JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, error: "Invalid email or password" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("admin_user");
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, isAuthenticated: !!user }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
