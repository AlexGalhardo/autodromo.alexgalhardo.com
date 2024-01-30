interface FormButton {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function Button({ children, ...props }: Readonly<FormButton>) {
    return (
        <button
            disabled={props?.disabled}
            {...props}
            className="border-green-500 border-2 hover:bg-green-800 hover:text-white hover:border-green-400 focus:outline-none font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
        >
            {children}
        </button>
    );
}
