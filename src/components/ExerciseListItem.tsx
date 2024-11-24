import React from "react";
import { Link } from "react-router-dom";
import { ExerciseListDetail } from "../pages/Exercises";

interface ExerciseListItemProps {
    detail: ExerciseListDetail;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ detail }) => {
    const allMuscles = [...detail.muscles, ...detail.muscles_secondary];
    const musclesString = allMuscles.join(", ");

    return (
        <div className="exercise-list-item">
            <Link to={`/exercises/${detail.exercise_base}`}>
                <div className="exercise-list-item-contents">
                    <p className="exercise-name">{detail.name}</p>
                    <p className="exercise-muscles">{musclesString}</p>
                </div>
            </Link>
        </div>
    );
};

export default ExerciseListItem;
