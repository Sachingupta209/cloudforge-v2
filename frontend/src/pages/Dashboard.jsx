const userEmail = localStorage.getItem("userEmail");
import { useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import AnalysisCard from "../components/AnalysisCard";
import HistoryTable from "../components/HistoryTable";

function Dashboard() {

    const [analysisResult, setAnalysisResult] = useState(null);
    const [refreshHistory, setRefreshHistory] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        window.location.href = "/";

    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-6xl mx-auto">

                <Navbar
                    userEmail={userEmail}
                    onLogout={logout}
                />

                <FileUpload
                    setAnalysisResult={setAnalysisResult}
                    setRefreshHistory={setRefreshHistory}
                />

                <AnalysisCard result={analysisResult} />

                <HistoryTable
                    refreshHistory={refreshHistory}
                />

            </div>

        </div>
    );
}

export default Dashboard;