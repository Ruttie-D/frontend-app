import { Navigate } from "react-router-dom";
import { TUser } from "../../Types/TUser";

type TRoutGuardProps = {
    children: React.ReactNode;
    user: TUser;
    publicOnly?: boolean;
    bizOnly?: boolean;
    adminOnly?: boolean;
};

const RoutGuard = (props: TRoutGuardProps) => {
    const { user, publicOnly } = props;

    // If user is not logged in and it's not a public-only route, redirect to login
    if (!publicOnly && !user) {
        return <Navigate to="/login" />;
    }

    // If user is logged in and trying to access public-only route (e.g., login or register), redirect to home
    if (publicOnly && user) {
        return <Navigate to="/" />;
    }

    return <>{props.children}</>;
};

export default RoutGuard;