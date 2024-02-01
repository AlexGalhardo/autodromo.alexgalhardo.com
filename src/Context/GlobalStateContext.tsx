import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Utils/Envs";

export enum UserRole {
    MANAGER = "MANAGER",
    AFFILIATE = "AFFILIATE",
    COMMON = "COMMON",
}

export interface User {
    id: string | null;
    role: UserRole;
    role_token: string;
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
    apiRequestError: string | undefined;

    setTotalNotifications: any;
    totalNotifications: number;

    setTotalRaces: any;
    totalRaces: number;

    setTotalUsers: any;
    totalUsers: number;

    setTotalMaintenances: any;
    totalMaintenances: number;

    setTotalSchedules: any;
    totalSchedules: number;

    setTotalRoads: any;
    totalRoads: number;

    setTotalKarts: any;
    totalKarts: number;

    setTotalRacesHistory: any;
    totalRacesHistory: number;

    userLogin: (username: string, password: string) => Promise<Element | undefined>;
    userLogout: () => Promise<void>;
    getUser: (token: string) => Promise<void>;
}

const GlobalStateContext = createContext<GlobalStateContextPort | undefined>(undefined);

export const GlobalStateProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [login, setLoggedIn] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [apiRequestError, setAPIRequestError] = useState<string | undefined>(undefined);
    const [totalNotifications, setTotalNotifications] = useState<number>(0);
    const [totalRaces, setTotalRaces] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalMaintenances, setTotalMaintenances] = useState<number>(0);
    const [totalSchedules, setTotalSchedules] = useState<number>(0);
    const [totalKarts, setTotalKarts] = useState<number>(0);
    const [totalRoads, setTotalRoads] = useState<number>(0);
    const [totalRacesHistory, setTotalRacesHistory] = useState<number>(0);
    const navigate = useNavigate();

    const userLogout = useCallback(async function () {
        setUser(null);
        setError(null);
        setLoading(false);
        setLoggedIn(false);
        window.localStorage.removeItem("token");
    }, []);

    async function getUser(jwtToken: string) {
        try {
            console.log("\n\n entrou jwtToken => ", jwtToken);

            const response = await fetch(`${API_URL}/user/check-logged-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const {
                data: { id, role, role_token, name, email, password, jwt_token, created_at, updated_at },
            } = await response.json();

            setUser({
                id,
                role,
                role_token,
                name,
                email,
                password,
                jwt_token,
                created_at,
                updated_at,
            });

            console.log("\n\n user é => ", user);

            setLoggedIn(true);
        } catch (error) {
            setLoggedIn(false);
        }
    }

    async function userLogin(email: string, password: string): Promise<any> {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_URL}/user/login`, {
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
                if (user?.role !== UserRole.MANAGER) navigate("/races/history");
                else navigate("/");
            }
        } catch (err: any) {
            setError(err.message);
            setLoggedIn(false);
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
                setLoggedIn(false);
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
                apiRequestError,
                totalNotifications,
                setTotalNotifications,
                setTotalRaces,
                totalRaces,
                setTotalUsers,
                totalUsers,
                setTotalMaintenances,
                totalMaintenances,
                setTotalSchedules,
                totalSchedules,
                setTotalRoads,
                totalRoads,
                setTotalKarts,
                totalKarts,
                setTotalRacesHistory,
                totalRacesHistory,
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
