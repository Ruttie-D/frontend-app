/* eslint-disable tailwindcss/classnames-order */
type FormWrapperProps = {
    children: React.ReactNode;
    className?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormWrapper = ({ children, onSubmit, className = "" }: FormWrapperProps) => {
    return (
        <form
            className={`flex flex-col gap-2 p-4 mx-auto text-center rounded-lg shadow-lg dark:bg-[#1f2937] ${className}`}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};

export default FormWrapper;
