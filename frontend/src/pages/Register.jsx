import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {

        try {

            await api.post("/auth/register", {
                fullName,
                email,
                password
            });

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Registration failed.");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Left Section */}

                <div className="bg-blue-600 text-white p-12 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold mb-6">
                        ☁️ CloudForge
                    </h1>

                    <p className="text-xl mb-8">
                        Dockerfile Security Analyzer
                    </p>

                    <p className="text-blue-100 leading-8">
                        Create your account and start analyzing
                        Dockerfiles for security issues, best
                        practices, and optimization.
                    </p>

                </div>

                {/* Right Section */}

                <div className="p-12 flex flex-col justify-center">

                    <h2 className="text-4xl font-bold text-slate-800 mb-2">
                        Create Account
                    </h2>

                    <p className="text-slate-500 mb-8">
                        Join CloudForge today
                    </p>

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="border rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={register}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-lg font-semibold transition"
                    >
                        Create Account
                    </button>

                    <p className="text-center mt-8 text-slate-500">

                        Already have an account?

                        <button
                            onClick={() => navigate("/")}
                            className="ml-2 text-blue-600 hover:underline"
                        >
                            Login
                        </button>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;