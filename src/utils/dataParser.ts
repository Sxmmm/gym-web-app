import axios from "axios";

export interface ExerciseDetail {
    id: number;
    name: string;
    language?: number;
    description: string;
    equipment: { id: number; name: string }[];
    muscles: { id: number; name: string; name_en: string }[];
    muscles_secondary: { id: number; name: string; name_en: string }[];
    image_url: string;
}

export const fetchExerciseDetail = async (
    id: number
): Promise<ExerciseDetail | null> => {
    try {
        const response = await axios.get(
            `https://wger.de/api/v2/exercisebaseinfo/${id}/`
        );

        const exerciseData = response.data;
        const exercise = (exerciseData.exercises || []).find(
            (detail: any) => detail.language === 2
        );

        if (!exercise) {
            console.warn(`No exercise found with language=2 for id: ${id}`);
            return null;
        }

        const exerciseDetail: ExerciseDetail = {
            id: exerciseData.id,
            name: exercise.name || "Unknown",
            description: exercise.description || "No description available.",
            equipment: exerciseData.equipment || [],
            muscles: exerciseData.muscles || [],
            muscles_secondary: exerciseData.muscles_secondary || [],
            image_url: exerciseData.images?.[0]?.image || "",
        };

        return exerciseDetail;
    } catch (error) {
        console.error(`Error fetching exercise with id ${id}:`, error);
        return null;
    }
};
