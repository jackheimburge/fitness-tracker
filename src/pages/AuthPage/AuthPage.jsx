import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from 'react';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    return (
        <main className="AuthPage">
            <div className="auth-left"><img src="https://i.imgur.com/LfL2Oth.png" alt="" /></div>
            <div className="auth-right">
                <h1>Catch phrase</h1>
                <h2>Join today.</h2>
                {showSignUpForm ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
                <button className="btn btn-primary" onClick={() => setShowSignUpForm(!showSignUpForm)}>{showSignUpForm ? 'Already have an account? Sign in' : 'Create an Account'}</button>
            </div>
        </main>
    );
}