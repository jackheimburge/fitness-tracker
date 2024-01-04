import { useState } from "react";

const DailyDataPage = ({ user, databaseExercises }) => {

    const [dailyData, setDailyData] = useState({
        date: new Date(),
        weight: null,
        exercises: [],
        foods: []
    })

    const addExercise = () => {
        const newExercise = {
            exercise: null,
            minutes: 0,
            caloriesBurned: 0
        };

        setDailyData((prevData) => ({
            ...prevData,
            exercises: [...prevData.exercises, newExercise]
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        setDailyData((prevData) => {
            const updatedExercises = [...prevData.exercises];
            updatedExercises[index][field] = value;
            return {
                ...prevData,
                exercises: updatedExercises
            }
        })

    }

    if (!databaseExercises) {
        return <p>Loading....</p>;
    }

    return (
        <form>
            <input
                name="date"
                type="date"
            />
            <input
                name="weight"
                type="number"
                placeholder="weight"
            />
            <select
                name="exercise"
                id="exercise"
                value={exercise.exercise || ''}
                onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
            >
                {databaseExercises.map((dbexercise, index) => (
                    <option
                        value={dbexercise._id}
                        key={index}
                    >
                        {dbexercise.exercise}
                    </option>
                ))}
            </select>
            <input
                type="number"
                name="minutes"
                placeholder="minutes"
            />
            <input
                type="number"
                name="caloriesBurned"
                placeholder="calories burned"
            />

            <button
                onClick={() => alert(`${databaseExercises[1].exercise}, ${user.name}`)}
            >
                Click me
            </button>
        </form>
    );
};

export default DailyDataPage;
