import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/GlobalStateContext";

export default function Races() {
    const { user, userLogout } = useGlobalState();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        userLogout();
        navigate("/login");
    }

    return (
        <>
			<section className="p-4 sm:ml-64 sm:p-5 mt-10">
				<div className=" px-4 lg:px-12 mt-10">
					<div className="bg-white dark:bg-gray-800 relative sm:rounded-lg">
						<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
							<div className="w-full md:w-1/2">
								<form className="flex items-center">
									<label htmlFor="simple-search" className="sr-only">Search race id...</label>
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
											</svg>
										</div>
										<input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search Race ID" required/>
									</div>
								</form>
							</div>
							<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
								<button type="button" className="flex items-center justify-center border border-green-500 text-green-500 hover:text-green hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-800 focus:outline-none">
									<svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
									</svg>
									Add Race
								</button>

								<div className="flex items-center space-x-3 w-full md:w-auto">
									<button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
										<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
										</svg>
										Filter Status
										<svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
											<path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
										</svg>
									</button>
									<div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
										<h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose Status</h6>
										<ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
											<li className="flex items-center">
												<input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
												<label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">CREATED</label>
											</li>
											<li className="flex items-center">
												<input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
												<label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">FINISHED</label>
											</li>
											<li className="flex items-center">
												<input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
												<label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">ABORTED</label>
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
										<th scope="col" className="px-4 py-3">RACE ID</th>
										<th scope="col" className="px-4 py-3">CREATED BY</th>
										<th scope="col" className="px-4 py-3">STATUS</th>
										<th scope="col" className="px-4 py-3">STARTS AT</th>
										<th scope="col" className="px-4 py-3">ENDS AT</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b dark:border-gray-700 hover:bg-gray-300">
										<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">65b68955e0d74179ef5deec4</th>
										<td className="px-4 py-3">aleexgvieira@gmail.com</td>
										<td className="px-4 py-3">CREATED</td>
										<td className="px-4 py-3">27/01/2024 14:50</td>
										<td className="px-4 py-3">27/01/2024 15:50</td>
										<td className="px-4 py-3 flex items-center justify-end">
											<button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
												See More
											</button>
											<div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
												<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
													</li>
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
													</li>
												</ul>
												<div className="py-1">
													<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b dark:border-gray-700 hover:bg-gray-300">
										<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">65b68955e0d74179ef5deec4</th>
										<td className="px-4 py-3">aleexgvieira@gmail.com</td>
										<td className="px-4 py-3">CREATED</td>
										<td className="px-4 py-3">27/01/2024 14:50</td>
										<td className="px-4 py-3">27/01/2024 15:50</td>
										<td className="px-4 py-3 flex items-center justify-end">
											<button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-28-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
												See More
											</button>
											<div id="apple-imac-28-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
												<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-28-dropdown-button">
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
													</li>
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
													</li>
												</ul>
												<div className="py-1">
													<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b dark:border-gray-700 hover:bg-gray-300">
										<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">65b68955e0d74179ef5deec4</th>
										<td className="px-4 py-3">aleexgvieira@gmail.com</td>
										<td className="px-4 py-3">CREATED</td>
										<td className="px-4 py-3">27/01/2024 14:50</td>
										<td className="px-4 py-3">27/01/2024 15:50</td>
										<td className="px-4 py-3 flex items-center justify-end">
											<button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-29-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
												See More
											</button>
											<div id="apple-imac-29-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
												<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-29-dropdown-button">
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
													</li>
													<li>
														<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
													</li>
												</ul>
												<div className="py-1">
													<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
        </>
    );
}
