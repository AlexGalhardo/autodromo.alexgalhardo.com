import { useLocation } from "react-router-dom";
import { UserRole, useGlobalState } from "../Context/GlobalStateContext";

export default function Sidebar() {
    const { user } = useGlobalState();
    const location = useLocation();

    return (
        <>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {user && user.role === UserRole.MANAGER && (
							<li>
								<a
									href="/"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-award-fill"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Races</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
						{user && user.role === UserRole.MANAGER && (
							<li>
								<a
									href="/users"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/users" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-people-fill"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Users</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
						{user && user.role === UserRole.MANAGER && (
							<li>
								<a
									href="/maintenances"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/maintenances" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-tools"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Maintenances</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
						{user && (user.role === UserRole.AFFILIATE || user.role === UserRole.MANAGER) && (
							<li>
								<a
									href="/schedules"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/schedules" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-calendar"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Schedules</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
						{user && user.role === UserRole.MANAGER && (
							<li>
								<a
									href="/roads"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/roads" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-bezier2"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Roads</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
						{user && user.role === UserRole.MANAGER && (
							<li>
								<a
									href="/karts"
									className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
										location.pathname === "/karts" ? "bg-gray-400" : undefined
									}`}
								>
									<i className="bi bi-car-front"></i>
									<span className="flex-1 ms-3 whitespace-nowrap">Karts</span>
									<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
										23
									</span>
								</a>
							</li>
						)}
                        <li>
                            <a
                                href="/races/history"
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
                                    location.pathname === "/races/history" ? "bg-gray-400" : undefined
                                }`}
                            >
                                <i className="bi bi-bar-chart"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">My Races</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    23
                                </span>
                            </a>
                        </li>

                        <hr />

                        <li>
                            <a
                                href="/notifications"
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-200 group ${
                                    location.pathname === "/notifications" ? "bg-gray-400" : undefined
                                }`}
                            >
                                <i className="bi bi-bell"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    192
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
