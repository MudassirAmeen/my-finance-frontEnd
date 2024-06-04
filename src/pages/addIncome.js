import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function AddIncome() {
    const [formData, setFormData] = useState({
        source: '',
        amount: '',
        description: '',
        date: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://192.168.1.25:8000/api/store/income", formData, {
                headers: {
                    user_id: localStorage.getItem('userId'),
                    token: localStorage.getItem('loginToken')
                }
            });
            setMessage(response.data.message);
            setErrors({});
            // Redirect to login page after successful registration
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            if (error.response) {
                // Validation errors
                setErrors(error.response.data.errors);
            } else {
                // Other errors
                setMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="mainContent">
            <Helmet>
                <title>My Finance - Add Income</title>
            </Helmet>
            <div className="content">
                <h1>Add Income In My Finance</h1>
                {message && <p className="successMessage">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                    />
                    {errors && errors.source && <p className="errorMessage">{errors.source}</p>}
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    {errors && errors.amount && <p className="errorMessage">{errors.amount}</p>}
                    <input
                        type="date"
                        placeholder="Enter Date (25 June, 2024) (Optional)"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors && errors.date && <p className="errorMessage">{errors.date}</p>}
                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors && errors.description && <p className="errorMessage">{errors.description}</p>}
                    <button type="submit" className="defaultButton">Add Income</button>
                </form>
            </div>
        </div>
    );
}

export default AddIncome;
