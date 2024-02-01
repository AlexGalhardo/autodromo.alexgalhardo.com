import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { UserRole, useGlobalState } from "../Context/GlobalStateContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../Utils/Envs";
import Button from "../Components/Forms/Button";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import RoadTableRow from "../Components/TableRow/RoadTableRow";

export interface Road {
    id: string;
    name: string;
    kilometers: number;
    quantity_boxes: number;
    quantity_places: number;
    address: string;
    created_at: string;
    updated_at: string;
}

export default function Roads() {
    const { login, user } = useGlobalState();

    const [roads, setRoads] = useState<Road[] | null>([]);
    const [roadSearchedById, setRoadSearchedById] = useState<Road | null>(null);

    const [name, setName] = useState<string>("");
    const [kilometers, setKilometers] = useState<number>(0);
    const [quantity_boxes, setQuantityBoxes] = useState<number>(0);
    const [quantity_places, setQuantityPlaces] = useState<number>(0);
    const [address, setAddress] = useState<string>("");

    const [loadingCreatingRoad, setLoadingCreatingRoad] = useState<boolean>(false);
    const [errorCreatingRoad, setErrorCreatingRoad] = useState<boolean>(false);
    const [createdRoad, setCreatedRoad] = useState<boolean>(false);
    const [errorAPI, setErrorAPI] = useState<string>("");

    useEffect(() => {
        const fetchRoads = async () => {
            try {
                const response = await fetch(`${API_URL}/road/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });

                const { data } = await response.json();
                if (data) {
                    setRoads(data);
                }
            } catch (error: any) {
                console.error("Error fetching roads: ", error);
            }
        };

        fetchRoads();
    }, []);

    const handleSearchRoadId = (e: any) => {
        const scheduleId = e.target.value;

        if (scheduleId.trim() !== "" && scheduleId.length > 2) {
            const scheduleFoundById = roads?.filter((schedule) => schedule.id === scheduleId);

            if (scheduleFoundById) {
                setRoadSearchedById(scheduleFoundById[0]);
            } else {
                setRoadSearchedById(null);
            }
        } else {
            setRoadSearchedById(null);
        }
    };

    async function handleCreateRoad(event: any) {
        event.preventDefault();

        if (name && kilometers && quantity_boxes && quantity_places && address) {
            try {
                setLoadingCreatingRoad(true);
                setErrorCreatingRoad(false);
                const response = await fetch(`${API_URL}/road`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        name,
                        kilometers,
                        quantity_boxes,
                        quantity_places,
                        address,
                    }),
                });

                const { success, message } = await response.json();
                if (success) {
                    setCreatedRoad(true);
                } else if (message) {
                    setErrorCreatingRoad(true);
                    setErrorAPI(message);
                }
            } catch (error: any) {
                setCreatedRoad(false);
                setErrorCreatingRoad(true);
                setErrorAPI(error.message);
                console.error("Error creating road: ", error);
            } finally {
                setLoadingCreatingRoad(false);
            }
        }
    }

    useEffect(() => {
        if (createdRoad) {
            setName("");
            setKilometers(0);
            setQuantityBoxes(0);
            setQuantityPlaces(0);
            setAddress("");
        }
    }, [createdRoad]);

    if (login === false) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== UserRole.MANAGER) return <Navigate to="/races/history" />;

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
                                            placeholder="Search Road ID"
                                            required
                                            onChange={handleSearchRoadId}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    data-modal-target="add-road-modal"
                                    data-modal-toggle="add-road-modal"
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
                                    Add Road
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
                                                    BEING USED
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
                                                    SCHEDULED
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
                                                    AVAILABLE
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
                                            ROAD ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            NAME
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            KILOMETERS
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            QUANTITY BOXES
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            QUANTITY PLACES
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            ADDRESS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!roadSearchedById && roads?.map((road) => <RoadTableRow road={road} />)}

                                    {roadSearchedById && <RoadTableRow road={roadSearchedById} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div
                id="add-road-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <form className="p-4 md:p-5" onSubmit={handleCreateRoad}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Road Name
                                    </label>
                                    <input
                                        type="text"
                                        name="road_name"
                                        id="road_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit road name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Kilometers
                                    </label>
                                    <input
                                        type="number"
                                        step={1}
                                        min={2}
                                        max={100}
                                        name="road_kilometers"
                                        id="road_kilometers"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Total road kilometers"
                                        required
                                        value={kilometers}
                                        onChange={(e) => setKilometers(Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Quantity Boxes
                                    </label>
                                    <input
                                        type="number"
                                        step={1}
                                        min={10}
                                        max={10000}
                                        name="road_quantity_boxes"
                                        id="road_quantity_boxes"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit road quantity boxes"
                                        required
                                        value={quantity_boxes}
                                        onChange={(e) => setQuantityBoxes(Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Quantity Places
                                    </label>
                                    <input
                                        type="number"
                                        step={1}
                                        min={10}
                                        max={10000}
                                        name="road_quantity_places"
                                        id="road_quantity_places"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit road quantitty places"
                                        required
                                        value={quantity_places}
                                        onChange={(e) => setQuantityPlaces(Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="ends_at"
                                        id="ends_at"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Digit road address"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            {loadingCreatingRoad ? (
                                <Button disabled={true}>Processing...</Button>
                            ) : (
                                <Button>Add New Road</Button>
                            )}

                            <ErrorAlertMessage message={errorCreatingRoad && errorAPI} />

                            <SuccessAlertMessage message={createdRoad && `Road Created!`} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
