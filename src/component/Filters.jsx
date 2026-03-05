export default function Filters({
  genres,
  selectedGenre,
  setSelectedGenre,
  minRating,
  setMinRating,
  query,
  setQuery,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
      <div className="flex flex-col md:flex-row gap-3">
        <div>
          <label className="text-xs text-zinc-400">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a title..."
            className="mt-1 w-full md:w-64 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="mt-1 w-full md:w-52 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="All">All</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-zinc-400">Min Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="mt-1 w-full md:w-40 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-red-600"
          >
            {[0, 7, 7.5, 8, 8.5, 9].map((r) => (
              <option key={r} value={r}>
                {r === 0 ? "Any" : `${r}+`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-zinc-400">
        Tip: click any row to open details in a new tab.
      </div>
    </div>
  );
}