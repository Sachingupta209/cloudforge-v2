import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);

    const login = async () => {

        try {

            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", email);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid email or password");

        } finally {

            setLoading(false);

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
                        Analyze Dockerfiles, detect security
                        issues, generate reports, and follow
                        container best practices with ease.
                    </p>

                </div>

                {/* Right Section */}

                <div className="p-12 flex flex-col justify-center">

                    <h2 className="text-4xl font-bold text-slate-800 mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-slate-500 mb-8">
                        Sign in to continue
                    </p>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-slate-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border border-slate-300 rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={login}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl py-4 text-lg font-semibold transition"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                    <div className="flex items-center my-6">

                        <hr className="flex-1 border-slate-300" />

                        <span className="mx-4 text-slate-400">
                            OR
                        </span>

                        <hr className="flex-1 border-slate-300" />

                    </div>

                    <button
                        className="border border-slate-300 rounded-xl py-4 hover:bg-slate-100 transition flex items-center justify-center gap-2"
                    >
                        🌐 Continue with Google
                    </button>

                    <p className="text-center mt-8 text-slate-500">

                        Don't have an account?

                        <button
                            className="ml-2 text-blue-600 hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;