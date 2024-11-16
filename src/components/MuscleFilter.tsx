import axios from "axios";
import { useEffect, useState } from "react";

interface MuscleFilterProps {
    onMuscleSelect: (muscleId: string) => void;
}

interface Muscle {
    id: number;
    name: string;
}

const MuscleFilter: React.FC<MuscleFilterProps> = ({ onMuscleSelect }) => {
    const [muscles, setMuscles] = useState<Muscle[]>([]);

    const fetchMuscles = async () => {
        try {
            const response = await axios.get("https://wger.de/api/v2/muscle/");
            setMuscles(response.data.results);
        } catch (error) {
            console.error("Error fetching muscles:", error);
        }
    };

    useEffect(() => {
        fetchMuscles();
    }, []);

    return (
        <select onChange={(e) => onMuscleSelect(e.target.value)}>
            <option value="">All Muscles</option>
            {muscles.map((muscle) => (
                <option key={muscle.id} value={muscle.id}>
                    {muscle.name}
                </option>
            ))}
        </select>
    );
};

export default MuscleFilter;
