import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate for navigation
import {toast} from "react-hot-toast";
import axios from 'axios';

const PetrolPumpLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const auth1 = localStorage.getItem("token");
        const auth2 = localStorage.getItem("master");
        const auth3=localStorage.getItem("pumpToken");
        if (auth1) {
            navigate("/");
        }
        if (auth2) {
            navigate("/AddPetrolPump");
        }
        if (auth3) {
            navigate("/PumpDashboard");
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/PumpLogin', {
                email,
                password
            });
            const result = await response.data;
            console.log(result);

            if (result.error) {
                toast.error(result.error);
            } else {
                localStorage.setItem("pumpToken", JSON.stringify(result));
                toast.success("Logged In Successfully!");
                navigate('/PumpDashboard');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Display error message to the user
        }
    };

    return (
        <div className="container">
            <h2 className='title'> Petrol Pump Login</h2>
            <div className="card">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter Pump Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className='submit-button'>Login</button>
                </form>
                </div>
        </div>
    );
};

export default PetrolPumpLogin;
