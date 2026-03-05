const KEY = "netflix_clone_favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function isFavorite(movieId) {
  return getFavorites().includes(movieId);
}

export function toggleFavorite(movieId) {
  const current = getFavorites();
  const exists = current.includes(movieId);
  const next = exists ? current.filter((id) => id !== movieId) : [...current, movieId];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}