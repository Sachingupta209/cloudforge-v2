function Navbar({ userEmail, onLogout }) {

    return (

        <nav className="bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center mb-8">

            <div>

                <h1 className="text-3xl font-bold text-blue-600">
                    ☁️ CloudForge
                </h1>

                <p className="text-slate-500">
                    Dockerfile Security Analyzer
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="text-sm text-slate-500">
                        Logged in as
                    </p>

                    <p className="font-semibold text-slate-700">
                        {userEmail}
                    </p>

                </div>

                <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;