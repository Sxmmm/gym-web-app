import React, { useEffect, useState } from "react";
import axios from "axios";
import MuscleFilter from "../components/MuscleFilter";

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
    const [query, setQuery] = useState<string>("");
    const [muscle, setMuscle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");

    const fetchExercises = async () => {
        setLoading(true);
        console.log(
            `Fetching exercises with page=${page}, query=${query}, muscle=${muscle}, difficulty=${difficulty}`
        );

        try {
            const offset = (page - 1) * 20;
            const params: any = {
                offset: offset,
                limit: 20,
            };

            if (query) params.name = query;
            if (muscle) params.muscles = muscle;
            if (difficulty) params.difficulty = difficulty;

            const response = await axios.get(
                "https://wger.de/api/v2/exercisebaseinfo/",
                { params }
            );

            console.log("API Response:", response.data);

            console.log("API Response Results:", response.data.results);

            console.log(
                "API Response Results:",
                response.data.results.flatMap(
                    (exercise: Exercise) => exercise.exercises || []
                )
            );

            console.log(
                "AAAAAAAAAAA:",
                response.data.results
                    .flatMap((exercise: Exercise) => exercise.exercises || [])
                    .filter((detail: ExerciseDetail) => detail.language === 2)
            );

            const filteredExercises = (response.data.results || [])
                .flatMap((exercise: Exercise) => exercise.exercises || [])
                .filter((detail: ExerciseDetail) => detail.language === 2);

            setExercises(filteredExercises);
            setTotalPages(Math.ceil(response.data.count / 20)); // assuming response.data.count gives total items
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger `fetchExercises` on relevant state changes
    useEffect(() => {
        fetchExercises();
    }, [page, query, muscle, difficulty]);

    // Helper to handle reset to first page when filters change
    const handleFilterChange = () => {
        setPage(1);
    };

    return (
        <div>
            <h1>Exercises</h1>

            {/* Filters */}
            <div>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleFilterChange();
                    }}
                />

                <MuscleFilter
                    onMuscleSelect={(id) => {
                        setMuscle(id);
                        handleFilterChange();
                    }}
                />

                <select
                    value={difficulty}
                    onChange={(e) => {
                        setDifficulty(e.target.value);
                        handleFilterChange();
                    }}
                >
                    <option value="">All Difficulties</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
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
