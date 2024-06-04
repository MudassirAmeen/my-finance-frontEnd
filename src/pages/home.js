import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import defaultProfile from "../default_profile.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function formatDate(dateString) {
    // Create a new Date object from the given date string
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    // Format the date using toLocaleDateString() method
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}

function Home() {
    let totalIncome = 0;
    const [incomeData, setIncomeData] = useState([]);
    let totalExpense = 0;
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        // Fetch income data
        axios.post("http://192.168.1.25:8000/api/income", {}, {
            headers: {
                user_id: localStorage.getItem('userId'),
                token: localStorage.getItem('loginToken')
            }
        }).then((response) => {
            setIncomeData(response.data.data);
            totalIncome = response.data.totalIncome;
        }).catch((error) => {
            console.error("Error fetching income data:", error);
        });

        // Fetch expense data
        axios.post("http://192.168.1.25:8000/api/expense", {}, {
            headers: {
                user_id: localStorage.getItem('userId'),
                token: localStorage.getItem('loginToken')
            }
        }).then((response) => {
            setExpenseData(response.data.data);
            totalExpense = response.data.totalExpense;
        }).catch((error) => {
            console.error("Error fetching expense data:", error);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>My Finance - Home</title>
            </Helmet>
            <div className="banner">
                <img className="profile" src={defaultProfile} alt="Profile" />
                <h1>Welcome {localStorage.getItem('name')}.</h1>
            </div>
            <div className="mainContent dashboard">
                <div className="content">
                    <div className="card">
                        <div className="card-header">
                            {/* Sum of all the amount */}
                            <h2>Your Income In May ($ {totalIncome})</h2>
                            <Link to="/addIncome">+</Link>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr className="header">
                                        <th>Date</th>
                                        <th>Source</th>
                                        <th>Income</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomeData.map((item, index) => (
                                        <tr key={index} className={index % 2 !== 0 ? "even" : "odd"}>
                                            <td>{item.date ? item.date : formatDate(item.created_at)}</td>
                                            <td>{item.source}</td>
                                            <td>${item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <Link to="/">Load More</Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h2>Your Expenses In May ($ {totalExpense})</h2>
                            <Link to="/addExpense">+</Link>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr className="header">
                                        <th>Date</th>
                                        <th>Reason</th>
                                        <th>Spend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseData.map((item, index) => (
                                        <tr key={index} className={index % 2 !== 0 ? "even" : "odd"}>
                                            <td>{item.date ? item.date : formatDate(item.created_at)}</td>
                                            <td>{item.reason}</td>
                                            <td>${item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <Link to="/">Load More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
