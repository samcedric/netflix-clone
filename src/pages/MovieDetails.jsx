import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import { movies } from "../data/movies.js";
import { isFavorite, toggleFavorite } from "../utils/favorites.js";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = useMemo(() => movies.find((m) => m.id === id), [id]);
  const [fav, setFav] = useState(() => (movie ? isFavorite(movie.id) : false));

  const suggestions = useMemo(() => {
    if (!movie) return [];
    return movies
      .filter((m) => m.id !== movie.id)
      .filter((m) => m.genre === movie.genre)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [movie]);

  const openSuggestion = (movieId) => {
    // In details view, keep same tab navigation.
    navigate(`/movie/${movieId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!movie) {
    return (
      <div>
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h1 className="text-2xl font-bold">Movie not found</h1>
            <p className="mt-2 text-zinc-400">The movie ID doesn’t exist in the demo dataset.</p>
            <button
              className="mt-4 rounded-xl bg-white text-zinc-950 px-4 py-2 font-semibold"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavorite(movie.id);
    setFav((v) => !v);
  };

  return (
    <div>
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
          <div
            className="h-[420px] bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            <div className="relative h-full p-6 md:p-10 flex items-end">
              <div className="max-w-2xl">
                <div className="text-xs text-zinc-300 bg-zinc-950/60 border border-zinc-800 rounded-full px-3 py-1 inline-flex items-center gap-2">
                  <span className="font-semibold text-zinc-100">{movie.genre}</span>
                  <span>•</span>
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>⭐ {movie.rating}</span>
                  <span>•</span>
                  <span>{movie.runtime}</span>
                </div>

                <h1 className="mt-4 text-3xl md:text-5xl font-extrabold">{movie.title}</h1>
                <p className="mt-3 text-zinc-200/90">{movie.synopsis}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    className="rounded-xl bg-white text-zinc-950 px-4 py-2 font-semibold hover:bg-zinc-200 transition"
                    onClick={handleToggleFavorite}
                  >
                    {fav ? "★ Remove Favorite" : "☆ Add to Favorite"}
                  </button>
                  <button
                    className="rounded-xl bg-zinc-900/70 border border-zinc-700 px-4 py-2 font-semibold hover:bg-zinc-900 transition"
                    onClick={() => navigate("/")}
                  >
                    ← Back Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Suggested (Same Genre)</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => openSuggestion(s.id)}
                className="text-left rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition overflow-hidden"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.backdrop || s.poster})` }}
                />
                <div className="p-4">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {s.genre} • {s.year} • ⭐ {s.rating}
                  </div>
                  <div className="text-sm text-zinc-300 mt-2 line-clamp-2">
                    {s.synopsis}
                  </div>
                </div>
              </button>
            ))}

            {!suggestions.length && (
              <div className="text-zinc-400">No suggestions found for this genre.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}