import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchExerciseDetail } from "../utils/dataParser";

interface Exercise {
    id: number;
    name: string;
    description: string;
    equipment: { id: number; name: string }[];
    muscles: { id: number; name: string; name_en: string }[];
    muscles_secondary: { id: number; name: string; name_en: string }[];
    image_url: string;
}

const Planner: React.FC = () => {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [exerciseIdInput, setExerciseIdInput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ids = selectedExercises.map((exercise) => exercise.id).join(",");
        setSearchParams({ exercises: ids });
    }, [selectedExercises, setSearchParams]);

    useEffect(() => {
        const idsParam = searchParams.get("exercises");
        if (idsParam) {
            const ids = idsParam.split(",").map(Number);
            const fetchExercises = async () => {
                try {
                    const exercisesFromURL = await Promise.all(
                        ids.map((id) => fetchExerciseDetail(id))
                    );
                    setSelectedExercises(
                        exercisesFromURL.filter(
                            (exercise): exercise is Exercise =>
                                Boolean(exercise)
                        )
                    );
                } catch (error) {
                    console.error("Error loading exercises:", error);
                }
            };
            fetchExercises();
        }
    }, [searchParams]);

    const addExerciseById = async () => {
        if (!exerciseIdInput) {
            setError("Please enter a valid exercise ID.");
            return;
        }

        try {
            const id = parseInt(exerciseIdInput, 10);
            if (isNaN(id)) {
                setError("Exercise ID must be a number.");
                return;
            }

            // Check if the exercise is already added
            if (selectedExercises.some((exercise) => exercise.id === id)) {
                setError("This exercise is already in your planner.");
                return;
            }

            const exercise = await fetchExerciseDetail(id);

            if (!exercise) {
                setError("No exercise found with this ID.");
                return;
            }

            setSelectedExercises([...selectedExercises, exercise]);
            setExerciseIdInput("");
            setError(null);
        } catch (error) {
            console.error("Error fetching exercise:", error);
            setError("An error occurred while fetching the exercise.");
        }
    };

    const removeExercise = (exerciseId: number) => {
        setSelectedExercises(
            selectedExercises.filter((ex) => ex.id !== exerciseId)
        );
    };

    return (
        <div>
            <h2>Planner</h2>

            {/* Add Exercise by ID */}
            <div>
                <input
                    type="text"
                    placeholder="Enter Exercise ID"
                    value={exerciseIdInput}
                    onChange={(e) => setExerciseIdInput(e.target.value)}
                />
                <button onClick={addExerciseById}>Add Exercise</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            {/* Selected Exercises */}
            <h3>Selected Exercises</h3>
            <ul>
                {selectedExercises.map((exercise) => (
                    <li key={exercise.id}>
                        <strong>{exercise.name}</strong>
                        <p>{exercise.description}</p>
                        <button onClick={() => removeExercise(exercise.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            {/* Shareable Link */}
            <h4>Shareable URL:</h4>
            <p>{window.location.href}</p>
        </div>
    );
};

export default Planner;
