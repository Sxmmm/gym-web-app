import React from "react";

interface ExerciseProps {
    name: string;
    description: string;
}

// CURRENTLY NOT IN USE
const ExercisePage: React.FC<ExerciseProps> = ({ name, description }) => (
    <div>
        <h3>{name}</h3>
        <p>{description}</p>
    </div>
);

export default ExercisePage;
