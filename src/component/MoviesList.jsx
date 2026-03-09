export default function MoviesList({ movies, onOpenMovie }) {
  return (
    <div className="mt-5">
      {!movies.length ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-10 text-center text-zinc-400">
          No movies match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => onOpenMovie(movie.id)}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:border-zinc-600">
                <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-800">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <h3 className="line-clamp-1 font-semibold text-zinc-100">
                    {movie.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
                    <span>{movie.year}</span>
                    <span>⭐ {movie.rating}</span>
                  </div>
                  <div className="mt-2 inline-flex rounded-full border border-zinc-700 px-2 py-1 text-[11px] text-zinc-300">
                    {movie.genre}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}