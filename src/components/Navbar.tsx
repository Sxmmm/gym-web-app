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
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/exercises">Exercises</Link>
                </li>
                <li>
                    <Link to="/planner">Planner</Link>
                </li>
                <li>
                    <Link to="/workouts">Pre Made Workouts</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
