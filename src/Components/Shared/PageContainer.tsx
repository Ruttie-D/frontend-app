/* eslint-disable tailwindcss/classnames-order */
type PageContainerProps = {
    children: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
    const { children } = props;

    return (
        <div
            className={`flex-col justify-center gap-2 px-0 dark:bg-[var(--secondary-color)] -mt-4 pb-28 min-h-[85vh]`}>
            {children}
        </div>
    );
}

export default PageContainer;