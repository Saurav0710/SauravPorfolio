import { useEffect, useState } from 'react';

interface Category {
  id: number;
  cat_key: string;
  title: string;
  subtitle?: string;
  cover?: string;
  created_at: string;
}

export default function Projects() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-4">Projects</h2>
          <p className="text-gray-300 mb-8">Browse all video work below.</p>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-4">Projects</h2>
          <p className="text-gray-300 mb-8">Browse all video work below.</p>
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-4">Projects</h2>
        <p className="text-gray-300 mb-8">Browse all video work below.</p>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 items-start py-2 px-2">
            {categories.map((cat, idx) => {
              // determine a suitable image to show for the category
              const cover = cat.cover;
              const isImage = cover && /\.(png|jpe?g|webp|gif)$/i.test(cover);
              const isVideo = cover && /\.(mp4|webm|mov)$/i.test(cover);

              const onClick = () => {
                window.history.pushState({}, '', `/projects/${encodeURIComponent(cat.cat_key)}`);
                window.dispatchEvent(new CustomEvent('navigate-project'));
              };

              return (
                <button
                  key={cat.cat_key}
                  onClick={onClick}
                  className="flex-shrink-0 w-96 relative group overflow-hidden rounded-xl"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 bg-black overflow-hidden rounded-xl">
                    {isImage ? (
                      <img src={cover} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : isVideo ? (
                      <video src={cover} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">{cat.title}</div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 text-white text-6xl font-black opacity-40 group-hover:opacity-60 transition-opacity">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">
                      {cat.title}
                    </h3>
                    {cat.subtitle && (
                      <p className="text-gray-300 text-sm mt-1 line-clamp-1">
                        {cat.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
