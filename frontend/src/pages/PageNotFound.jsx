import { NavLink } from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white font-bold" : "text-gray-400"
              }
            >
              Return to Home Page
            </NavLink>
        </div>
    );
}

export default PageNotFound