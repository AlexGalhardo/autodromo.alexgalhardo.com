import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { API_URL } from "../../Utils/Envs";
import { useState } from "react";

export default function LoginForm() {
    const { userLogin, error, loading, login } = useGlobalState();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    if (login === true) {
        return <Navigate to="/profile" />;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email && password) {
            userLogin(email, password);
        }
    }

    return (
			<form className="max-w-sm mx-auto mt-10">
				<a href="/">
					<h2 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text dark:text-white">
						Autodromo
					</h2>
				</a>
				<div className="mb-5">
					<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digit your email</label>
					<input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digit your email here" required/>
				</div>
				<div className="mb-5">
					<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digit your password</label>
					<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digit your password here" required/>
				</div>
				<button
					type="submit"
					className="border-green-500 border-2 hover:bg-green-800 hover:border-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center">
					Login
				</button>
			</form>
	);
}
