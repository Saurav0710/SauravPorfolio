import { useEffect, useState } from "react";

interface Category {
  id: number;
  cat_key: string;
  title: string;
  subtitle?: string;
  cover?: string;
  created_at?: string;
}

interface ApiError {
  message?: string;
  error?: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    cat_key: "",
    title: "",
    subtitle: "",
    cover: ""
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      cat_key: "",
      title: "",
      subtitle: "",
      cover: ""
    });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setFormData({
      cat_key: category.cat_key,
      title: category.title,
      subtitle: category.subtitle || "",
      cover: category.cover || ""
    });
    setEditingCategory(category);
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
    if (!formData.cat_key || !formData.title) {
      setError("cat_key and title are required");
      return;
    }
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");
      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`;
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cat_key: formData.cat_key.trim(),
          title: formData.title.trim(),
          subtitle: formData.subtitle.trim() || null,
          cover: formData.cover.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to ${editingCategory ? 'update' : 'create'} category`);
      }
      setSuccess(`Category ${editingCategory ? 'updated' : 'created'} successfully`);
      fetchCategories();
      closeModal();
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || `Failed to ${editingCategory ? 'update' : 'create'} category`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.title}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }
      setSuccess("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || "Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
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
            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25"
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
            Categories
          </h1>
          <div className="w-10" />
        </div>

        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  📁 Category Management
                </h1>
                <p className="text-gray-400 mt-2">Organize your video categories with ease</p>
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
                ➕ Create New Category
              </button>
            </div>

            {/* Categories Grid/List */}
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    📋 All Categories
                  </h2>
                  {loading && (
                    <div className="flex items-center space-x-2 text-purple-400">
                      <div className="animate-spin">⟳</div>
                      <span className="text-sm">Loading...</span>
                    </div>
                  )}
                </div>
              </div>

              {categories.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <div className="text-6xl mb-4">📁</div>
                  <p className="text-lg">No categories yet</p>
                  <p className="text-sm mt-2">Click "Create New Category" to add your first category</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-800/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            🆔 ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            🔑 Key
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            📝 Title
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            📄 Subtitle
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            🖼️ Cover
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            ⚙️ Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-500/10">
                        {categories.map((cat) => (
                          <tr key={cat.id} className="hover:bg-slate-800/30 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                                #{cat.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                                {cat.cat_key}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {cat.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                              {cat.subtitle || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {cat.cover ? (
                                <a
                                  href={cat.cover}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                                >
                                  🖼️ View
                                </a>
                              ) : (
                                <span className="text-gray-500">No cover</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditModal(cat)}
                                  className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(cat)}
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
                    {categories.map((cat) => (
                      <div key={cat.id} className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate">
                              {cat.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 truncate">
                              {cat.subtitle || "No subtitle"}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs ml-2">
                            #{cat.id}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                            {cat.cat_key}
                          </span>
                          {cat.cover && (
                            <a
                              href={cat.cover}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline"
                            >
                              🖼️ Cover
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(cat)}
                            className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs rounded-lg transition-all duration-200"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat)}
                            className="flex-1 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xs rounded-lg transition-all duration-200"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
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
                  {editingCategory ? "✏️ Edit Category" : "➕ Create New Category"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    🔑 Category Key *
                  </label>
                  <input
                    type="text"
                    value={formData.cat_key}
                    onChange={(e) => setFormData({ ...formData, cat_key: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="e.g. youtube"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    📝 Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="YouTube Videos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    📄 Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Short description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    🖼️ Cover URL
                  </label>
                  <input
                    type="url"
                    value={formData.cover}
                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/30 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="https://..."
                  />
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
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                  >
                    {saving ? (
                      <span className="flex items-center space-x-2">
                        <div className="animate-spin">⟳</div>
                        <span>Saving...</span>
                      </span>
                    ) : (
                      editingCategory ? "💾 Update Category" : "🚀 Create Category"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}