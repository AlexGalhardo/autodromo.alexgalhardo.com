import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../Context/GlobalStateContext";
import Button from "../Forms/Button";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";
import { useState } from "react";

export default function LoginForm() {
    const { userLogin, error, loading, login } = useGlobalState();
    const [email, setEmail] = useState<string>("manager@gmail.com");
    const [password, setPassword] = useState<string>("managerTEST@123");

    if (login === true) {
        return <Navigate to="/" />;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (email && password) {
            userLogin(email, password);
        }
    }

    return (
        <>
            <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
                <a href="/">
                    <h2 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text dark:text-white">
                        Galhardo Autodromo
                    </h2>
                </a>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Digit your email
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email"
                        id="email"
                        placeholder="Digit your email here"
                        minLength={8}
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Digit your password
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        id="password"
                        minLength={8}
                        placeholder="Digit your password here"
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue={password}
                        required
                    />
                </div>

                {loading ? <Button disabled={true}>Processing...</Button> : <Button>Login</Button>}

                <ErrorAlertMessage message={error && "Email and/or Password Invalid"} />
            </form>

            <div className="p-6 text-center mt-5">
                <span>© 2024 Copyright </span>
                <a className="font-semibold text-green-600" href="https://alexgalhardo.com">
                    AlexGalhardo
                </a>
            </div>
        </>
    );
}
