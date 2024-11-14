import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Exercises from "./pages/Exercises";
import Planner from "./pages/Planner";
import Workouts from "./pages/Workouts";
import About from "./pages/About";
import Home from "./pages/Home";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/gym-web-app" element={<Home />} />
                <Route path="/gym-web-app/exercises" element={<Exercises />} />
                <Route path="/gym-web-app/planner" element={<Planner />} />
                <Route path="/gym-web-app/workouts" element={<Workouts />} />
                <Route path="/gym-web-app/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
