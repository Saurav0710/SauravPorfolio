import { useState, useEffect } from 'react';

interface UploadError {
    message?: string;
}

export default function AdminUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('youtube');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    // Check if admin is logged in
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('video/')) {
                setVideoFile(file);
                setError('');
            } else {
                setError('Please select a video file');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !category || !videoFile) {
            setError('Title, category, and video are required');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('video', videoFile);

            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();
            setSuccess('Video uploaded successfully! 🎉');
            setTitle('');
            setDescription('');
            setCategory('youtube');
            setVideoFile(null);
            
            // Reset file input
            const fileInput = document.getElementById('videoFile') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (err) {
            const error = err as UploadError;
            setError(error.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Upload Video</h1>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Upload Form */}
                <div className="bg-gray-900 rounded-lg shadow-2xl p-8 border border-blue-500/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Video Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                placeholder="e.g., Amazing Brand Film 2024"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                placeholder="Add a description for your video"
                                rows={4}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="youtube">YouTube Videos</option>
                                <option value="genai">GenAI Ads</option>
                                <option value="brand">Brand Films</option>
                            </select>
                        </div>

                        {/* Video File */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Select Video File *</label>
                            <div className="border-2 border-dashed border-gray-700 rounded p-6 text-center cursor-pointer hover:border-blue-500 transition duration-200">
                                <input
                                    id="videoFile"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label htmlFor="videoFile" className="cursor-pointer">
                                    <div className="text-gray-400">
                                        {videoFile ? (
                                            <div>
                                                <p className="text-green-400 font-semibold">✓ {videoFile.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>📁 Click to select or drag and drop</p>
                                                <p className="text-sm text-gray-500 mt-1">Supported: MP4, WebM, MOV, AVI</p>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="p-4 bg-red-900/30 border border-red-700 rounded text-red-300">
                                ❌ {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-900/30 border border-green-700 rounded text-green-300">
                                ✅ {success}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold rounded transition duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="inline-block animate-spin">⟳</span>
                                    Uploading...
                                </>
                            ) : (
                                '🚀 Upload Video'
                            )}
                        </button>
                    </form>

                    {/* Info Box */}
                    <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded text-gray-300 text-sm">
                        <p className="font-semibold mb-2">📝 Upload Tips:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Videos are stored on Cloudinary (not GitHub)</li>
                            <li>Max file size: 500MB per upload</li>
                            <li>Recommended format: MP4 (H.264 codec)</li>
                            <li>Videos appear on the portfolio after upload</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
