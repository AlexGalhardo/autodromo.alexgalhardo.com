import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Utils/Envs";

export interface ProfileUpdateDTO {
    username?: string | null;
    telegramNumber?: string | null;
    newPassword?: string | null;
    confirmNewPassword?: string | null;
}

export interface User {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    jwt_token: string | null;
    created_at: string | null;
    updated_at: string | null;
}

interface GlobalStateContextPort {
    error: null | string;
    loading: boolean;
    user: User | null;
    login: null | boolean;
    updatedProfile: boolean;
    sendRecoverPassword: boolean;
    sendResetPassword: boolean;
    apiRequestError: string | undefined;
    userLogin: (username: string, password: string) => Promise<Element | undefined>;
    userLogout: () => Promise<void>;
    getUser: (token: string) => Promise<void>;
    userRegister: (username: string, email: string, password: string) => Promise<any>;
    updateProfile({ username, telegramNumber, newPassword, confirmNewPassword }: ProfileUpdateDTO): void;
    forgetPassword: (email: string) => Promise<any>;
    resetPassword(resetPasswordToken: string, newPassword: string, confirmNewPassword: string): Promise<any>;
    isValidResetPasswordToken(resetPasswordToken: string): Promise<boolean>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [login, setLogin] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [sendRecoverPassword, setSendRecoverPassword] = useState<boolean>(false);
    const [sendResetPassword, setSendResetPassword] = useState<boolean>(false);
    const [updatedProfile, setUpdatedProfile] = useState<boolean>(false);
    const [apiRequestError, setAPIRequestError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const userLogout = useCallback(async function () {
        setUser(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem("token");
    }, []);

    async function getUser(token: string) {
        setLogin(true);

        const response = await fetch(`${API_URL}/check-user-jwt-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const { data } = await response.json();

        setUser({
            id: data.id,
            name: data.username,
            email: data.email,
            password: data.password,
            jwt_token: data.jwt_token,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }

    async function forgetPassword(email: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
            }
        } catch (err: any) {
            setError(err.message);
            setSendRecoverPassword(true);
        } finally {
            setSendRecoverPassword(true);
            setLoading(false);
        }
    }

    async function resetPassword(
        resetPasswordToken: string,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/reset-password/${resetPasswordToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword,
                    confirmNewPassword,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
            } else {
                setSendResetPassword(true);
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
        } catch (err: any) {
            setError(err.message);
            setSendResetPassword(true);
        } finally {
            setSendResetPassword(true);
            setLoading(false);
        }
    }

    async function isValidResetPasswordToken(resetPasswordToken: string): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/check-reset-password-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resetPasswordToken,
                }),
            });
            const json = await response.json();
            if (!json.success) navigate("/");
        } catch (err: any) {
            setError(err.message);
            navigate("/");
        }
    }

    async function userLogin(email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setAPIRequestError(message);
                setError("Email and/or Password Invalid");
            } else {
                const json = await response.json();
                if (json.redirect) {
                    window.location.href = json.redirect;
                }
                window.localStorage.setItem("token", json.jwt_token);
                await getUser(json.jwt_token);
                navigate("/profile");
            }
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, telegramNumber, newPassword, confirmNewPassword }: ProfileUpdateDTO) {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username,
                    telegramNumber,
                    newPassword,
                    confirmNewPassword,
                }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
                setUpdatedProfile(false);
                setAPIRequestError(message);
            } else {
                const { data } = await response.json();
                if (user) {
                    setUser({
                        ...user,
                        name: data.username,
                        password: data.password,
                    });
                    setUpdatedProfile(true);
                    setAPIRequestError("");
                }
            }
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            setUpdatedProfile(false);
        } finally {
            setLoading(false);
        }
    }

    async function userRegister(username: string, email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const { message } = await response.json();
                setAPIRequestError(message);
            } else {
                const { jwt_token } = await response.json();
                window.localStorage.setItem("token", jwt_token);
                await getUser(jwt_token);
                navigate("/profile");
            }
        } catch (err: any) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function autoLogin() {
            const currentUrl = window.location.href;
            const urlSearchParams = new URLSearchParams(currentUrl.split("?")[1]);
            let token = null;
            if (urlSearchParams.get("token")) {
                console.log('urlSearchParams.get("token") ======> ', urlSearchParams.get("token"));
                token = urlSearchParams.get("token");
                window.localStorage.setItem("token", token as string);
            } else if (window.localStorage.getItem("token")) token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    await getUser(token);
                } catch (err) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLogin(false);
            }
        }
        autoLogin();
    }, []);

    return (
        <GlobalStateContext.Provider
            value={{
                userLogin,
                userLogout,
                user,
                error,
                loading,
                login,
                getUser,
                userRegister,
                sendRecoverPassword,
                forgetPassword,
                updateProfile,
                updatedProfile,
                resetPassword,
                sendResetPassword,
                isValidResetPasswordToken,
                apiRequestError,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalStateContextPort => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used inside GlobalStateProvider");
    }
    return context;
};
