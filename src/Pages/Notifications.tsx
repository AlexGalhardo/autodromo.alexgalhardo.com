import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

export default function Notifications() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="p-4 sm:ml-64 sm:p-5 mt-10">
                <div className="px-4 lg:px-12 mt-10 text-center">
                    <div
                        className="p-8 mb-4 text-lg text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        role="alert"
                    >
                        <span className="font-medium">MAINTENANCE: </span> Kart ID 1234 send to maintenance
                    </div>
                    <div
                        className="p-8 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">ACCIDENT: </span> Happened on road id: 12344
                    </div>
                    <div
                        className="p-8 mb-4 text-lg text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        <span className="font-medium">KART ID 1234 IS BACK FROM MAINTENANCE</span>
                    </div>
                    <div
                        className="p-8 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                        role="alert"
                    >
                        <span className="font-medium">Warning alert!</span> Change a few things up and try submitting
                        again.
                    </div>
                    <div
                        className="p-8 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                        role="alert"
                    >
                        <span className="font-medium">Dark alert!</span> Change a few things up and try submitting
                        again.
                    </div>
                </div>
            </section>
        </>
    );
}
