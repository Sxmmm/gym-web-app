import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Gym Web App</h1>{" "}
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/gym-web-app">Home</Link>
                </li>
                <li>
                    <Link to="/gym-web-app/exercises">Exercises</Link>
                </li>
                <li>
                    <Link to="/gym-web-app/planner">Planner</Link>
                </li>
                <li>
                    <Link to="/gym-web-app/workouts">Pre Made Workouts</Link>
                </li>
                <li>
                    <Link to="/gym-web-app/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
