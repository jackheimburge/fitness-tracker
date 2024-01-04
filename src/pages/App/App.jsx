
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as exercisesAPI from '../../utilities/exercises-api';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import DailyDataPage from '../../pages/DailyDataPage/DailyDataPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [databaseExercises, setDatabaseExercises] = useState(null);

  useEffect(function () {
    const getDatabaseExercises = async () => {
      const databaseExercises = await exercisesAPI.getDatabaseExercises();
      setDatabaseExercises(databaseExercises);
    }
    getDatabaseExercises();
  }, [])

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/:userId/daily-data" element={<DailyDataPage user={user} databaseExercises={databaseExercises} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main >
  );
}
