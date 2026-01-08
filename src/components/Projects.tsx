import { categories } from '../data/projectsData';

interface Category {
  id: number;
  cat_key: string;
  title: string;
  subtitle?: string;
  cover?: string;
  created_at: string;
}

export default function Projects() {
  // Map the hardcoded categories to match the expected interface
  const mappedCategories: Category[] = categories.map((cat, index) => ({
    id: index + 1,
    cat_key: cat.key,
    title: cat.title,
    subtitle: cat.subtitle,
    cover: cat.cover,
    created_at: new Date().toISOString(), // dummy date
  }));

  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-4">Projects</h2>
        <p className="text-gray-300 mb-8">Browse all video work below.</p>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 items-start py-2 px-2">
            {mappedCategories.map((cat, idx) => {
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
