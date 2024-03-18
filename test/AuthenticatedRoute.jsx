import React, { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import Auth from "../contexts/Auth";

const AuthenticatedRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(Auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Route path={path} element={React.createElement(component)} /> : null;
}

export default AuthenticatedRoute;