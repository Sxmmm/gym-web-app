import React, { useEffect, useState } from "react";
import axios from "axios";

interface Equipment {
    id: number;
    name: string;
}

interface EquipmentFilterProps {
    onEquipmentSelect: (equipmentId: string) => void;
}

const EquipmentFilter: React.FC<EquipmentFilterProps> = ({
    onEquipmentSelect,
}) => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(
                    "https://wger.de/api/v2/equipment/"
                );
                setEquipment(response.data.results);
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, []);

    return (
        <select onChange={(e) => onEquipmentSelect(e.target.value)}>
            <option value="">All Equipment</option>
            {equipment.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};

export default EquipmentFilter;
