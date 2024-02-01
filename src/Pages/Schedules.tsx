import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { UserRole, useGlobalState } from "../Context/GlobalStateContext";
import { Navigate } from "react-router-dom";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import Button from "../Components/Forms/Button";
import { useEffect, useState } from "react";
import { API_URL } from "../Utils/Envs";
import ScheduleTableRow from "../Components/TableRow/ScheduleTableRow";

export interface Schedule {
    id: string;
    user_id: string;
    kart_id: string;
    road_id: string;
    starts_at: string;
    ends_at: string;
    created_at: string;
    updated_at: string;
}

export default function Schedules() {
    const { login, user, setTotalSchedules } = useGlobalState();

    const [schedules, setSchedules] = useState<Schedule[] | null>([]);
    const [scheduleSearchedById, setScheduleSearchedById] = useState<Schedule | null>(null);

    const [kart_id, setKartId] = useState<string>("");
    const [road_id, setRoadId] = useState<string>("");
    const [starts_at, setStartsAt] = useState<string>("");
    const [ends_at, setEndsAt] = useState<string>("");

    const [loadingCreatingSchedule, setLoadingCreatingSchedule] = useState<boolean>(false);
    const [errorCreatingSchedule, setErrorCreatingSchedule] = useState<boolean>(false);
    const [createdSchedule, setCreatedSchedule] = useState<boolean>(false);
    const [errorAPI, setErrorAPI] = useState<string>("");

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch(`${API_URL}/schedule/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });

                const { data } = await response.json();
                if (data) {
                    setSchedules(data);
                    setTotalSchedules(data.length);
                }
            } catch (error: any) {
                console.error("Error fetching schedules: ", error);
            }
        };

        fetchSchedules();
    }, []);

    const handleSearchScheduleId = (e: any) => {
        const scheduleId = e.target.value;

        if (scheduleId.trim() !== "" && scheduleId.length > 2) {
            const scheduleFoundById = schedules?.filter((schedule) => schedule.id === scheduleId);

            if (scheduleFoundById) {
                setScheduleSearchedById(scheduleFoundById[0]);
            } else {
                setScheduleSearchedById(null);
            }
        } else {
            setScheduleSearchedById(null);
        }
    };

    async function handleCreateSchedule(event: any) {
        event.preventDefault();

        if (kart_id && road_id && starts_at && ends_at) {
            try {
                setLoadingCreatingSchedule(true);
                setErrorCreatingSchedule(false);
                const response = await fetch(`${API_URL}/schedule`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        kart_id,
                        road_id,
                        starts_at,
                        ends_at,
                    }),
                });

                const { success, message } = await response.json();
                if (success) {
                    setCreatedSchedule(true);
                } else if (message) {
                    setErrorCreatingSchedule(true);
                    setErrorAPI(message);
                }
            } catch (error: any) {
                setCreatedSchedule(false);
                setErrorCreatingSchedule(true);
                setErrorAPI(error.message);
                console.error("Error creating schedule: ", error);
            } finally {
                setLoadingCreatingSchedule(false);
            }
        }
    }

    useEffect(() => {
        if (createdSchedule) {
            setKartId("");
            setRoadId("");
            setStartsAt("");
            setEndsAt("");
        }
    }, [createdSchedule]);

    if (login === false) {
        return <Navigate to="/login" />;
    }

    if (user?.role === UserRole.COMMON) return <Navigate to="/races/history" />;

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="p-4 sm:ml-64 sm:p-5 mt-10">
                <div className=" px-4 lg:px-12 mt-10">
                    <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search Schedule ID"
                                            onChange={handleSearchScheduleId}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    data-modal-target="add-schedule-modal"
                                    data-modal-toggle="add-schedule-modal"
                                    type="button"
                                    className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >
                                    <svg
                                        className="h-3.5 w-3.5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add Schedule
                                </button>

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
                                                    CREATED
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
                                                    FINISHED
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="razor"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="razor"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    CANCELED
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
                                            SCHEDULE ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            USER ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            ROAD ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            KART ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            STARTS AT
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            ENDS AT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!scheduleSearchedById &&
                                        schedules?.map((schedule) => <ScheduleTableRow schedule={schedule} />)}

                                    {scheduleSearchedById && <ScheduleTableRow schedule={scheduleSearchedById} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div
                id="add-schedule-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <form className="p-4 md:p-5" onSubmit={handleCreateSchedule}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Road ID
                                    </label>
                                    <input
                                        type="text"
                                        name="road_id"
                                        id="road_id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit road ID"
                                        required
                                        value={road_id}
                                        onChange={(e) => setRoadId(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Kart ID
                                    </label>
                                    <input
                                        type="text"
                                        name="kart_id"
                                        id="kart_id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit kart id"
                                        required
                                        value={kart_id}
                                        onChange={(e) => setKartId(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Starts At
                                    </label>
                                    <input
                                        type="text"
                                        name="starts_at"
                                        id="starts_at"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Example: 28/01/2024 16:00"
                                        required
                                        value={starts_at}
                                        onChange={(e) => setStartsAt(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Ends At
                                    </label>
                                    <input
                                        type="text"
                                        name="ends_at"
                                        id="ends_at"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Example: 28/01/2024 17:00"
                                        required
                                        value={ends_at}
                                        onChange={(e) => setEndsAt(e.target.value)}
                                    />
                                </div>
                            </div>

                            {loadingCreatingSchedule ? (
                                <Button disabled={true}>Processing...</Button>
                            ) : (
                                <Button>Add New Schedule</Button>
                            )}

                            <ErrorAlertMessage message={errorCreatingSchedule && errorAPI} />

                            <SuccessAlertMessage message={createdSchedule && `Schedule Created!`} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
