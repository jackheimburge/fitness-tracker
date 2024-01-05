import { useState } from "react";

const DailyDataPage = ({ user, databaseExercises }) => {
    const [dailyData, setDailyData] = useState({
        date: new Date(),
        weight: null,
        exercises: [
            {
                exercise: null,
                minutes: 0,
                caloriesBurned: 0,
            },
        ],
        foods: [],
    });

    const addExercise = () => {
        const newExercise = {
            exercise: null,
            minutes: 0,
            caloriesBurned: 0,
        };

        setDailyData((prevData) => ({
            ...prevData,
            exercises: [...prevData.exercises, newExercise],
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        setDailyData((prevData) => {
            const updatedExercises = [...prevData.exercises];
            updatedExercises[index][field] = value;
            return {
                ...prevData,
                exercises: updatedExercises,
            };
        });
    };

    if (!databaseExercises) {
        return <p>Loading....</p>;
    }

    return (
        <form>
            <input name="date" type="date" />
            <input name="weight" type="number" placeholder="weight" />

            {dailyData.exercises.map((exercise, index) => (
                <div key={index}>
                    <select
                        name="exercise"
                        id={`exercise-${index}`}
                        value={exercise.exercise || ''}
                        onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
                    >
                        <option value="">Select an exercise</option>
                        {databaseExercises.map((dbexercise) => (
                            <option
                                value={dbexercise._id}
                                key={dbexercise._id}
                            >
                                {dbexercise.exercise}
                            </option>
                        ))}
                    </select>
                    <input type="number" name="minutes" placeholder="minutes" />
                    <input type="number" name="caloriesBurned" placeholder="calories burned" />
                </div>
            ))}

            <button onClick={() => alert(`${databaseExercises[1].exercise}, ${user.name}`)}>
                Click me
            </button>
            <button type="button" onClick={addExercise}>
                Add Exercise
            </button>
        </form>
    );
};

export default DailyDataPage;
