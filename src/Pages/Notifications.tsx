import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useGlobalState } from "../Context/GlobalStateContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../Utils/Envs";
import NotificationTableRow from "../Components/TableRow/NotificationTableRow";

export enum NotificationType {
    RACE_STARTED = "RACE_STARTED",
    RACE_ACCIDENT = "RACE_ACCIDENT",
}

export interface Notification {
    race_id: string;
    type: NotificationType;
    message: string;
    created_at: string;
}

export default function Notifications() {
    const { login, setTotalNotifications } = useGlobalState();

    const [notifications, setNotifications] = useState<Notification[] | null>([]);

    useEffect(() => {
        const fetchRacesHistory = async () => {
            try {
                const response = await fetch(`${API_URL}/notification/history`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });

                const { data } = await response.json();
                if (data) {
                    setNotifications(data);
					setTotalNotifications(data.length)
                }
            } catch (error) {
                console.error("Error fetching notifications history: ", error);
            }
        };

        fetchRacesHistory();
    }, []);

    if (login === false) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="p-4 sm:ml-64 sm:p-5 mt-10">
                <div className=" px-4 lg:px-12 mt-10">
                    <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg">
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <button
                                    id="filterDropdownButton"
                                    data-dropdown-toggle="filterDropdown"
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="h-4 w-4 mr-2 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Filter Status
                                    <svg
                                        className="-mr-1 ml-1.5 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="filterDropdown"
                                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                                >
                                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                        Choose Status
                                    </h6>
                                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                        <li className="flex items-center">
                                            <input
                                                id="apple"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="apple"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                            >
                                                RACE_STARTED
                                            </label>
                                        </li>
                                        <li className="flex items-center">
                                            <input
                                                id="fitbit"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="fitbit"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                            >
                                                RACE_ACCIDENT
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left dark:text-gray-400">
                            <thead className="text-lsx text-green uppercase dark:bg-gray-700 dark:text-gray-400">
                                <tr>
									<th scope="col" className="px-4 py-3">
                                        TYPE
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        RACE ID
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        MESSAGE
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        CREATED AT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications?.map((notification) => (
                                    <NotificationTableRow notification={notification} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
