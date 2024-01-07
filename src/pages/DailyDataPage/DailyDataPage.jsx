import { useState } from "react";
import * as dailyDataAPI from '../../utilities/dailyData-api';

const DailyDataPage = ({ user, databaseExercises }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [dailyData, setDailyData] = useState({
        date: new Date(),
        weight: null,
        exercise: {
            exerciseId: "",
            minutes: 0,
            caloriesBurned: 0
        },
        foods: [],
    });


    const handleExerciseChange = (field, value) => {
        setDailyData((prevData) => ({
            ...prevData,
            exercise: {
                ...prevData.exercise,
                [field]: value
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const addedExercise = await dailyDataAPI.addDailyData(dailyData);


    };

    if (!databaseExercises) {
        return <p>Loading....</p>;
    }

    return (
        <div>
            <form>
                <input name="date" type="date" value={dailyData.date}
                    onChange={(e) =>
                        setDailyData((prevData) => ({
                            ...prevData,
                            date: e.target.value,
                        }))
                    }
                />
                <input
                    name="weight"
                    type="number"
                    placeholder="weight"
                    value={dailyData.weight || ""}
                    onChange={(e) =>
                        setDailyData((prevData) => ({
                            ...prevData,
                            weight: e.target.value,
                        }))
                    }
                />
                <select
                    name="exercise"
                    value={dailyData.exercise.exerciseId || ""}
                    onChange={(e) => handleExerciseChange("exerciseId", e.target.value)}
                >
                    <option value="">Select an exercise</option>
                    {databaseExercises.map((dbexercise) => (
                        <option value={dbexercise._id} key={dbexercise._id}>
                            {dbexercise.exercise}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="minutes"
                    placeholder="minutes"
                    value={dailyData.exercise.minutes || ""}
                    onChange={(e) => handleExerciseChange("minutes", e.target.value)}
                />
                <input
                    type="number"
                    name="caloriesBurned"
                    placeholder="calories burned"
                    value={dailyData.exercise.caloriesBurned || ""}
                    onChange={(e) =>
                        handleExerciseChange("caloriesBurned", e.target.value)
                    }
                />
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <p>weight: {dailyData.weight}</p>
            <p>exerciseId: {dailyData.exercise.exerciseId}</p>
            <p>minutes: {dailyData.exercise.minutes}</p>
            <p>caloriesBurned: {dailyData.exercise.caloriesBurned}</p>
        </div>
    );
};

export default DailyDataPage;
