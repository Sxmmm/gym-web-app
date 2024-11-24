import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExerciseDetail, ExerciseDetail } from "../utils/dataParser";
import axios from "axios";

const ExerciseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [exercise, setExercise] = useState<ExerciseDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            setLoading(true);

            if (id) {
                const pasrsedID = parseInt(id, 10);
                if (!isNaN(pasrsedID)) {
                    const fetchedExercise = await fetchExerciseDetail(
                        pasrsedID
                    );
                    if (fetchedExercise) {
                        setExercise(fetchedExercise);
                    } else {
                        alert("Exercise not found or invalid ID.");
                    }

                    setExercise(fetchedExercise);
                    setLoading(false);
                }
            }
        };

        fetchExerciseDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!exercise) {
        return <p>Exercise not found.</p>;
    }

    return (
        <div>
            <h1>
                {exercise.name} - {exercise.id}
            </h1>
            <p>{exercise.description}</p>
            <h2>Equipment</h2>
            <ul>
                {exercise.equipment.map((eq) => (
                    <li key={eq.id}>{eq.name}</li>
                ))}
            </ul>
            <h2>Muscles</h2>
            <ul>
                {exercise.muscles.map((muscle) => (
                    <li key={muscle.id}>{muscle.name_en || muscle.name}</li>
                ))}
                {exercise.muscles_secondary.map((muscle) => (
                    <li key={muscle.id}>{muscle.name_en || muscle.name}</li>
                ))}
            </ul>
            <h2>Images</h2>
            <img src={exercise.image_url} />
        </div>
    );
};

export default ExerciseDetail;
