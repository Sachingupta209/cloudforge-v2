import api from "../services/api";

function AnalysisCard({ result }) {

    if (!result) return null;

    const downloadPdf = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(

                "/report/pdf",

                result,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: "blob"
                }

            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "CloudForge_Report.pdf"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            alert("Failed to download PDF.");

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
                📊 Analysis Result
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-blue-50 rounded-xl p-6">

                    <p className="text-slate-500 mb-2">
                        Score
                    </p>

                    <h1 className="text-4xl font-bold text-blue-600">
                        ⭐ {result.score}
                    </h1>

                </div>

                <div className="bg-green-50 rounded-xl p-6">

                    <p className="text-slate-500 mb-2">
                        Grade
                    </p>

                    <h1 className="text-4xl font-bold text-green-600">
                        🏅 {result.grade}
                    </h1>

                </div>

                <div className="bg-slate-50 rounded-xl p-6">

                    <p className="text-slate-500 mb-2">
                        File
                    </p>

                    <h1 className="text-lg font-semibold break-all">
                        📄 {result.fileName}
                    </h1>

                </div>

            </div>

            <div className="mt-8">

                <h3 className="text-xl font-semibold mb-3">
                    ⚠️ Warnings
                </h3>

                <ul className="list-disc ml-6 space-y-2">

                    {result.warnings?.length > 0 ? (

                        result.warnings.map((warning, index) => (

                            <li key={index}>
                                {warning}
                            </li>

                        ))

                    ) : (

                        <li>No warnings found.</li>

                    )}

                </ul>

            </div>

            <div className="mt-8">

                <h3 className="text-xl font-semibold mb-3">
                    💡 Recommendations
                </h3>

                <ul className="list-disc ml-6 space-y-2">

                    {result.recommendations?.length > 0 ? (

                        result.recommendations.map((recommendation, index) => (

                            <li key={index}>
                                {recommendation}
                            </li>

                        ))

                    ) : (

                        <li>No recommendations available.</li>

                    )}

                </ul>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    onClick={downloadPdf}
                    className="px-5 py-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                    📄 Download PDF
                </button>

            </div>

        </div>

    );

}

export default AnalysisCard;