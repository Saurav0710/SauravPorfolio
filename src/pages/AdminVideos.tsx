import { useEffect, useState, useCallback } from "react";

interface Video {
  id: number;
  category_id: number;
  source: string;
  video_identifier: string;
  title: string;
  description?: string;
  thumb?: string;
  order_index?: number;
  cat_key?: string;
  category_title?: string;
}

interface Category {
  id: number;
  cat_key: string;
  title: string;
}

interface ApiError {
  message?: string;
  error?: string;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    source: "youtube",
    video_identifier: "",
    title: "",
    description: "",
    thumb: "",
    order_index: ""
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      // ignore for now
    }
  }, [API_URL]);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/videos`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCategories();
    fetchVideos();
  }, [fetchCategories, fetchVideos]);

  const resetForm = () => {
    setFormData({
      category_id: "",
      source: "youtube",
      video_identifier: "",
      title: "",
      description: "",
      thumb: "",
      order_index: ""
    });
    setEditingVideo(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (video: Video) => {
    setFormData({
      category_id: video.category_id.toString(),
      source: video.source,
      video_identifier: video.video_identifier,
      title: video.title,
      description: video.description || "",
      thumb: video.thumb || "",
      order_index: video.order_index?.toString() || ""
    });
    setEditingVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.category_id || !formData.video_identifier || !formData.title) {
      setError("Category, video identifier and title are required");
      return;
    }
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");
      const url = editingVideo
        ? `${API_URL}/api/videos/${editingVideo.id}`
        : `${API_URL}/api/videos`;
      const method = editingVideo ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_id: parseInt(formData.category_id),
          source: formData.source,
          video_identifier: formData.video_identifier.trim(),
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          thumb: formData.thumb.trim() || null,
          order_index: formData.order_index ? parseInt(formData.order_index) : 0,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to ${editingVideo ? 'update' : 'create'} video`);
      }
      setSuccess(`Video ${editingVideo ? 'updated' : 'created'} successfully`);
      fetchVideos();
      closeModal();
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || `Failed to ${editingVideo ? 'update' : 'create'} video`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (video: Video) => {
    if (!confirm(`Are you sure you want to delete "${video.title}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/videos/${video.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete video");
      }
      setSuccess("Video deleted successfully");
      fetchVideos();
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || "Failed to delete video");
    }
  };

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
            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25"
          >
            🎥 Videos
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.__navigate?.("/admin/login");
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-red-500/25"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Videos
          </h1>
          <div className="w-10" />
        </div>

        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  🎥 Video Management
                </h1>
                <p className="text-gray-400 mt-2">Manage your video portfolio with ease</p>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-xl text-green-300 backdrop-blur-sm">
                ✅ {success}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl text-red-300 backdrop-blur-sm">
                ❌ {error}
              </div>
            )}

            {/* Create Button */}
            <div className="flex justify-center md:justify-start mb-6">
              <button
                onClick={openCreateModal}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105"
              >
                ➕ Create New Video
              </button>
            </div>

            {/* Videos Grid/List */}
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    📋 All Videos
                  </h2>
                  {loading && (
                    <div className="flex items-center space-x-2 text-purple-400">
                      <div className="animate-spin">⟳</div>
                      <span className="text-sm">Loading...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        🎬 Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        📂 Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        🔗 Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        📊
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        ⚙️ Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            {video.thumb && (
                              <img
                                src={video.thumb}
                                alt={video.title}
                                className="w-12 h-12 rounded-lg object-cover border border-purple-500/20"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-white truncate">
                                {video.title}
                              </div>
                              <div className="text-sm text-gray-400 truncate max-w-xs">
                                {video.description || "No description"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {video.category_title || video.cat_key || "Uncategorized"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <span className="capitalize px-2 py-1 bg-slate-700 rounded-full text-xs">
                            {video.source}
                          </span>
                          <div className="text-xs text-gray-500 truncate max-w-xs mt-1">
                            {video.video_identifier}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                            #{video.order_index ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(video)}
                              className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(video)}
                              className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-start space-x-3 mb-3">
                      {video.thumb && (
                        <img
                          src={video.thumb}
                          alt={video.title}
                          className="w-16 h-16 rounded-lg object-cover border border-purple-500/20"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {video.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {video.category_title || video.cat_key || "Uncategorized"}
                      </span>
                      <span className="px-2 py-1 bg-slate-700 rounded-full capitalize">
                        {video.source}
                      </span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                        #{video.order_index ?? 0}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(video)}
                        className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs rounded-lg transition-all duration-200"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video)}
                        className="flex-1 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xs rounded-lg transition-all duration-200"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {videos.length === 0 && !loading && (
                <div className="p-12 text-center text-gray-400">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">No videos yet</p>
                  <p className="text-sm mt-2">Click "Create New Video" to add your first video</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {editingVideo ? "✏️ Edit Video" : "➕ Create New Video"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      📂 Category *
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    >
                      <option value="" className="bg-slate-800">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-slate-800">
                          {c.title} ({c.cat_key})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      🔗 Source
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      <option value="youtube" className="bg-slate-800">📺 YouTube</option>
                      <option value="local" className="bg-slate-800">💾 Local/Uploaded</option>
                      <option value="drive" className="bg-slate-800">☁️ Google Drive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    🔗 Video Identifier *
                  </label>
                  <input
                    value={formData.video_identifier}
                    onChange={(e) => setFormData(prev => ({ ...prev, video_identifier: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="e.g. Qr0upTwWZ1I, /uploads/file.mp4, or https://drive.google.com/file/d/..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    🎬 Title *
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    📝 Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    rows={4}
                    placeholder="Optional description"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      🖼️ Thumbnail URL
                    </label>
                    <input
                      value={formData.thumb}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumb: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="https:// or /uploads/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      📊 Order
                    </label>
                    <input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) => setFormData(prev => ({ ...prev, order_index: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl text-red-300 backdrop-blur-sm">
                    ❌ {error}
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-6 border-t border-purple-500/20">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white transition-all duration-200 backdrop-blur-sm border border-purple-500/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                  >
                    {saving ? (
                      <span className="flex items-center space-x-2">
                        <div className="animate-spin">⟳</div>
                        <span>Saving...</span>
                      </span>
                    ) : (
                      editingVideo ? "💾 Update Video" : "🚀 Create Video"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

