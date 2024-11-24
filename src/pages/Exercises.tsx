import React, { useEffect, useState } from "react";
import axios from "axios";
import MuscleFilter from "../components/MuscleFilter";
import EquipmentFilter from "../components/EquipmentFilter";
import { Link } from "react-router-dom";
import ExerciseListItem from "../components/ExerciseListItem";

export interface ExerciseListDetail {
    id: number;
    name: string;
    description: string;
    language: number;
    exercise_base: number;
    muscles: string[];
    muscles_secondary: string[];
}

interface MuslceData {
    id: number;
    name: string;
    name_en: string;
}

interface Exercise {
    id: number;
    uuid: string;
    exercises: ExerciseListDetail[];
    muscles: MuslceData[];
    muscles_secondary: MuslceData[];
}

const Exercises: React.FC = () => {
    const [exercises, setExercises] = useState<ExerciseListDetail[]>([]);
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
                .flatMap((exercise: Exercise) =>
                    (exercise.exercises || []).map(
                        (detail: ExerciseListDetail) => {
                            const muscleNames = (exercise.muscles || []).map(
                                (muscle) => muscle.name_en || muscle.name
                            );

                            const secondaryMuscleNames = (
                                exercise.muscles_secondary || []
                            ).map((muscle) => muscle.name_en || muscle.name);

                            return {
                                ...detail,
                                muscles: muscleNames,
                                muscles_secondary: secondaryMuscleNames,
                            };
                        }
                    )
                )
                .filter((detail: ExerciseListDetail) => detail.language === 2);

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
        <div className="exercise-page">
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
                <ul className="exercise-list">
                    {exercises.map((detail) => (
                        <ExerciseListItem
                            key={detail.exercise_base}
                            detail={detail}
                        />
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
