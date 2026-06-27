import { useState } from "react";
import api from "../services/api";

function FileUpload({
                        setAnalysisResult,
                        setRefreshHistory
                    }) {

    const [file, setFile] = useState(null);

    const uploadFile = async () => {

        if (!file) {
            alert("Please select a Dockerfile.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/files/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAnalysisResult(response.data);
            setRefreshHistory(prev => !prev);

        } catch (error) {

            console.error(error);
            alert("Upload failed.");

        }
    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
                📤 Upload Dockerfile
            </h2>

            <div className="border-2 border-dashed border-blue-300 rounded-xl p-10 text-center bg-slate-50">

                <div className="text-6xl mb-4">
                    ☁️
                </div>

                <p className="text-slate-600 mb-6">
                    Drag & Drop your Dockerfile here
                </p>

                <p className="text-slate-500 mb-4">
                    or
                </p>

                <input
                    type="file"
                    id="dockerfile"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <label
                    htmlFor="dockerfile"
                    className="cursor-pointer bg-white border border-blue-500 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
                >
                    📂 Choose File
                </label>

                {file && (

                    <div className="mt-6 text-green-600 font-semibold">

                        ✅ Selected: {file.name}

                    </div>

                )}

            </div>

            <div className="mt-8 text-center">

                <button
                    onClick={uploadFile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
                >
                    🚀 Analyze Dockerfile
                </button>

            </div>

        </div>

    );

}

export default FileUpload;