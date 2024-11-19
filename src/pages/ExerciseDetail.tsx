import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ExerciseDetail {
    id: number;
    name: string;
    language?: number;
    description: string;
    equipment: { id: number; name: string }[];
    muscles: { id: number; name: string; name_en: string }[];
    muscles_secondary: { id: number; name: string; name_en: string }[];
    image_url: string;
}

const ExerciseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [exercise, setExercise] = useState<ExerciseDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExerciseDetail = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `https://wger.de/api/v2/exercisebaseinfo/${id}/`
                );

                const exercise: ExerciseDetail[] =
                    response.data.exercises.filter(
                        (detail: ExerciseDetail) => detail.language === 2
                    );

                console.log(exercise);

                // Transform the response data as needed
                const exerciseData = response.data;
                const exerciseDetail: ExerciseDetail = {
                    id: exerciseData.id,
                    name: exercise[0]?.name || "Unknown",
                    description:
                        exercise[0]?.description || "No description available.",
                    equipment: exerciseData.equipment || [],
                    muscles: exerciseData.muscles || [],
                    muscles_secondary: exerciseData.muscles_secondary || [],
                    image_url: exerciseData.images[0]?.image || [],
                };

                setExercise(exerciseDetail);
            } catch (error) {
                console.error("Error fetching exercise detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExerciseDetail();
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
