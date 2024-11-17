import React, { useEffect, useState } from "react";
import axios from "axios";
import MuscleFilter from "../components/MuscleFilter";
import EquipmentFilter from "../components/EquipmentFilter";

interface ExerciseDetail {
    id: number;
    name: string;
    description: string;
    language: number;
}

interface Exercise {
    id: number;
    uuid: string;
    exercises: ExerciseDetail[];
}

interface Exercises {
    id: number;
    uuid: string;
    name: string;
}

const Exercises: React.FC = () => {
    const [exercises, setExercises] = useState<Exercises[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [muscle, setMuscle] = useState<string>("");
    const [equipment, setEquipment] = useState<string>("");

    const fetchExercises = async () => {
        setLoading(true);
        console.log(
            `Fetching exercises with page=${page}, muscle=${muscle}, equipment=${equipment}`
        );

        try {
            const offset = (page - 1) * 20;
            const params: any = {
                offset: offset,
                limit: 20,
            };

            if (muscle) params.muscles = muscle;
            if (equipment) params.equipment = equipment;

            const response = await axios.get(
                "https://wger.de/api/v2/exercisebaseinfo/",
                { params }
            );

            const filteredExercises = (response.data.results || [])
                .flatMap((exercise: Exercise) => exercise.exercises || [])
                .filter((detail: ExerciseDetail) => detail.language === 2);

            setExercises(filteredExercises);
            setTotalPages(Math.ceil(response.data.count / 20));
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger `fetchExercises` on relevant state changes
    useEffect(() => {
        fetchExercises();
    }, [page, muscle, equipment]);

    // Helper to handle reset to first page when filters change
    const handleFilterChange = () => {
        setPage(1);
    };

    return (
        <div>
            <h1>Exercises</h1>

            {/* Filters */}
            <div>
                <MuscleFilter
                    onMuscleSelect={(id) => {
                        setMuscle(id);
                        handleFilterChange();
                    }}
                />

                <EquipmentFilter
                    onEquipmentSelect={(id) => {
                        setEquipment(id);
                        handleFilterChange();
                    }}
                />
            </div>

            {/* Exercise List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {exercises.map((detail) => (
                        <li key={detail.id}>{detail.name}</li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>
                    {" "}
                    Page {page} of {totalPages}{" "}
                </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Exercises;
