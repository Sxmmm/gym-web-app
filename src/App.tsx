import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Exercises from "./pages/Exercises";
import Planner from "./pages/Planner";
import Workouts from "./pages/Workouts";
import About from "./pages/About";
import Home from "./pages/Home";
import ExerciseDetail from "./components/ExerciseDetail";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/:id" element={<ExerciseDetail />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
