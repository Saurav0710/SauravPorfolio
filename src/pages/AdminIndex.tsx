export default function AdminIndex() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-8">Admin Panel</h1>
                <div className="space-y-4">
                    <a
                        href="/admin/login"
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
                    >
                        🔐 Admin Login
                    </a>
                    <p className="text-gray-400 mt-4">Or navigate to <code className="bg-gray-900 px-2 py-1 rounded text-yellow-300">/admin/login</code> to sign in</p>
                </div>
            </div>
        </div>
    );
}
