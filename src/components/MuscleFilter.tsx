import axios from "axios";
import { useEffect, useState } from "react";

interface MuscleFilterProps {
    onMuscleSelect: (muscleId: string) => void;
}

interface Muscle {
    id: number;
    name: string;
    name_en: string;
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
            {muscles.map((muscle) => {
                const name =
                    muscle.name_en !== "" ? muscle.name_en : muscle.name;
                return (
                    <option key={muscle.id} value={muscle.id}>
                        {name}
                    </option>
                );
            })}
        </select>
    );
};

export default MuscleFilter;
