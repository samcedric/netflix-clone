import { useMemo, useState } from "react";
import Navbar from "../component/Navbar.jsx";
import BannerCarousel from "../component/BannerCarousel.jsx";
import Filters from "../component/Filters.jsx";
import MoviesList from "../component/MoviesList.jsx";
import { movies as allMovies } from "../data/movies.js";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [query, setQuery] = useState("");

  const genres = useMemo(() => {
    return Array.from(new Set(allMovies.map((m) => m.genre))).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMovies
      .filter((m) => (selectedGenre === "All" ? true : m.genre === selectedGenre))
      .filter((m) => (minRating ? m.rating >= minRating : true))
      .filter((m) => (q ? m.title.toLowerCase().includes(q) : true))
      .sort((a, b) => b.rating - a.rating);
  }, [selectedGenre, minRating, query]);

  const bannerItems = useMemo(() => allMovies.slice(0, 5), []);

const navigate = useNavigate();

const openMovie = (id) => {
  navigate(`/movie/${id}`);
};

  return (
    <div>
      <Navbar />

      <BannerCarousel items={bannerItems} onOpenMovie={openMovie} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Popular on Netflix</h2>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <Filters
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            minRating={minRating}
            setMinRating={setMinRating}
            query={query}
            setQuery={setQuery}
          />

          <MoviesList movies={filtered} onOpenMovie={openMovie} />
        </div>
      </div>
    </div>
  );
}