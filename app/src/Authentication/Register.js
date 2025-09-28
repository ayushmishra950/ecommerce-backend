import React, { useState } from 'react';
import "../Css/Authentication/Register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://ecommerce-backend-qotf.onrender.com/register', formData);

            if (res.status === 201) { alert(res.data); navigate('/login') }
        }
        catch (err) {
            if (err.response && err.response.status === 409) { alert(err.response.data); }
            else { alert('Something went wrong. Please try again.'); }
        }

    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                pattern=".{3,}"
                title="Name must be at least 3 or more characters"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                title="Please include '@' and '.' in a valid format"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={10}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@]).{10,}$"
                title="Password must be at least 10 characters long and include letters, digits, and the @ symbol."
            />

            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Phone number must be exactly 10 digits"
            />

            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                pattern=".{10,}"
                title="Address must be at least 10 characters long"
            />


            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
