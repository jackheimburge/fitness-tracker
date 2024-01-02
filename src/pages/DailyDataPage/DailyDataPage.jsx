
const DailyDataPage = ({ user, databaseExercises }) => {

    return (
        <form>
            <input name="date" type="date" />
            <input name="weight" type="Number" />
            <button onClick={() => alert(`${databaseExercises[1].exercise}, ${user.name}`)}></button>

        </form>
    );
}

export default DailyDataPage;