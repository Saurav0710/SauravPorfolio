import { useState, useEffect } from "react";

interface UploadError {
  message?: string;
}

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("youtube");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        setError("");
      } else {
        setError("Please select a video file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !category || !videoFile) {
      setError("Title, category, and video are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("video", videoFile);

      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setSuccess("Video uploaded successfully! 🎉");
      setTitle("");
      setDescription("");
      setCategory("youtube");
      setVideoFile(null);

      // Reset file input
      const fileInput = document.getElementById(
        "videoFile"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      const error = err as UploadError;
      setError(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950/95 backdrop-blur-lg border-r border-purple-500/30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎬 Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <nav className="p-6 space-y-2">
          <button
            onClick={() => {
              window.__navigate?.("/admin/categories");
              setSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
          >
            📁 Categories
          </button>
          <button
            onClick={() => {
              window.__navigate?.("/admin/videos");
              setSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
          >
            🎥 Videos
          </button>
          <button
            onClick={() => {
              window.__navigate?.("/admin/upload");
              setSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25"
          >
            ⬆️ Upload
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-red-500/25"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Video
          </h1>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg text-sm hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-red-500/25"
          >
            Logout
          </button>
        </div>

        <div className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Upload Video
              </h1>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-red-500/25 font-semibold"
              >
                🚪 Logout
              </button>
            </div>

            {/* Upload Form */}
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    🎬 Video Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                    placeholder="e.g., Amazing Brand Film 2024"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    📝 Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                    placeholder="Add a description for your video"
                    rows={4}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    📁 Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <option value="youtube">YouTube Videos</option>
                    <option value="genai">GenAI Ads</option>
                    <option value="brand">Brand Films</option>
                  </select>
                </div>

                {/* Video File */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    🎥 Select Video File *
                  </label>
                  <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-500/5 transition-all duration-200">
                    <input
                      id="videoFile"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="videoFile" className="cursor-pointer">
                      <div className="text-gray-300">
                        {videoFile ? (
                          <div className="space-y-2">
                            <div className="text-green-400 text-lg">✓</div>
                            <p className="text-green-400 font-semibold text-lg">
                              {videoFile.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="text-4xl">📁</div>
                            <p className="font-medium">Click to select or drag and drop</p>
                            <p className="text-sm text-gray-400">
                              Supported: MP4, WebM, MOV, AVI
                            </p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Messages */}
                {error && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 backdrop-blur-sm">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-300 backdrop-blur-sm">
                    ✅ {success}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin text-xl">⟳</span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🚀</span>
                      Upload Video
                    </>
                  )}
                </button>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl text-gray-300 backdrop-blur-sm">
                <p className="font-bold mb-4 text-purple-300">📝 Upload Tips:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Videos are stored on Cloudinary (not GitHub)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Max file size: 500MB per upload
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Recommended format: MP4 (H.264 codec)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Videos appear on the portfolio after upload
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
