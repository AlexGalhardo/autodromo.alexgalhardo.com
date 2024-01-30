import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useGlobalState } from "../Context/GlobalStateContext";
import { Navigate } from "react-router-dom";

export default function Notifications() {
    const { login } = useGlobalState();

    if (login === false) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="p-4 sm:ml-64 sm:p-5 mt-10">
                <div className="px-4 lg:px-12 mt-10 text-left">
                    <div
                        className="p-8 mb-4 text-lg text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        role="alert"
                    >
                        <span className="font-medium">Kart ID 1234 send to maintenance</span>
                    </div>
                    <div
                        className="p-8 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">Happened on road id: 12344</span>
                    </div>
                    <div
                        className="p-8 mb-4 text-lg text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        <span className="font-medium">KART ID 1234 IS BACK FROM MAINTENANCE</span>
                    </div>
                </div>
            </section>
        </>
    );
}
