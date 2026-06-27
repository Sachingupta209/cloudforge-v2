import { useEffect, useState } from "react";
import api from "../services/api";

function HistoryTable({ refreshHistory }) {

    const [history, setHistory] = useState([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchHistory();
    }, [refreshHistory]);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/history", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setHistory(response.data);

        } catch (error) {

            console.error("Failed to load history:", error);

        }

    };

    const deleteHistory = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this analysis?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh table after deletion
            fetchHistory();

        } catch (error) {

            console.error(error);

            alert("Failed to delete analysis.");

        }

    };
    const viewAnalysis = async (id) => {

        console.log("VIEW CLICKED", id);

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);

            setSelectedAnalysis(response.data);
            setShowModal(true);

        } catch (error) {

            console.error(error);

        }

    };

    const downloadPdf = async (item) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/report/pdf",
                {
                    fileName: item.fileName,
                    score: item.score,
                    grade: item.grade,
                    warnings: item.warnings,
                    recommendations: item.recommendations
                },
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "CloudForge_Report.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);

            alert("Failed to download PDF.");

        }

    };
    return (

        <>
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
                📜 Recent Analyses
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">
                            📄 File
                        </th>

                        <th className="p-4 text-left">
                            ⭐ Score
                        </th>

                        <th className="p-4 text-left">
                            🏅 Grade
                        </th>

                        <th className="p-4 text-left">
                            📅 Created
                        </th>

                        <th className="p-4 text-center">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {history.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center p-8 text-slate-500"
                            >
                                No analysis history found.
                            </td>

                        </tr>

                    ) : (

                        history.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="p-4">
                                    {item.fileName}
                                </td>

                                <td className="p-4">
                                    {item.score}
                                </td>

                                <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-white font-semibold ${
                                                item.grade === "A"
                                                    ? "bg-green-500"
                                                    : item.grade === "B"
                                                        ? "bg-blue-500"
                                                        : item.grade === "C"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                            }`}
                                        >
                                            {item.grade}
                                        </span>

                                </td>

                                <td className="p-4 text-slate-500">
                                    {item.createdAt}
                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => viewAnalysis(item.id)}
                                            className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => downloadPdf(item)}
                                            className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                                        >
                                            PDF
                                        </button>

                                        <button
                                            onClick={() => deleteHistory(item.id)}
                                            className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                                        >
                                             Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    {showModal && selectedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto shadow-xl">

                <h2 className="text-2xl font-bold mb-4">
                    Analysis Details
                </h2>

                <p>
                    <strong>File:</strong> {selectedAnalysis.fileName}
                </p>

                <p>
                    <strong>Score:</strong> {selectedAnalysis.score}
                </p>

                <p>
                    <strong>Grade:</strong> {selectedAnalysis.grade}
                </p>

                <p>
                    <strong>Created:</strong> {selectedAnalysis.createdAt}
                </p>

                <div className="mt-4">
                    <h3 className="font-semibold text-lg">
                        Warnings
                    </h3>

                    <ul className="list-disc ml-6">
                        {selectedAnalysis.warnings?.map((warning, index) => (
                            <li key={index}>{warning}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold text-lg">
                        Recommendations
                    </h3>

                    <ul className="list-disc ml-6">
                        {selectedAnalysis.recommendations?.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex justify-end">

                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )}

        </>
    );

}

export default HistoryTable;