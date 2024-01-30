interface AlertError {
    message: string | null | boolean | undefined;
}

export default function ErrorAlertMessage({ message }: Readonly<AlertError>) {
    if (!message) return null;
    return (
        <p
            className="p-4 text-center mb-4 text font-bold text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-3"
            role="alert"
        >
            {message}
        </p>
    );
}
