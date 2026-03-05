export default function MoviesTable({ movies, onOpenMovie }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900/60 text-zinc-300">
          <tr>
            <th className="text-left px-4 py-3">Title</th>
            <th className="text-left px-4 py-3 hidden md:table-cell">Genre</th>
            <th className="text-left px-4 py-3 hidden md:table-cell">Year</th>
            <th className="text-left px-4 py-3">Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr
              key={m.id}
              className="border-t border-zinc-800 hover:bg-zinc-900/60 cursor-pointer"
              onClick={() => onOpenMovie(m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onOpenMovie(m.id)}
            >
              <td className="px-4 py-3">
                <div className="font-semibold">{m.title}</div>
                <div className="text-xs text-zinc-400 md:hidden">
                  {m.genre} • {m.year}
                </div>
              </td>
              <td className="px-4 py-3 hidden md:table-cell text-zinc-200">{m.genre}</td>
              <td className="px-4 py-3 hidden md:table-cell text-zinc-200">{m.year}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <span>⭐</span>
                  <span className="font-semibold">{m.rating}</span>
                </span>
              </td>
            </tr>
          ))}
          {!movies.length && (
            <tr>
              <td className="px-4 py-8 text-center text-zinc-400" colSpan={4}>
                No movies match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}