interface AlertSuccess {
    message: string | null | undefined | boolean;
}

export default function SuccessAlertMessage({ message }: Readonly<AlertSuccess>) {
    if (!message) return null;
    return (
        <p
            className="p-4 text-center text font-bold mt-3 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
        >
            {message}
        </p>
    );
}
