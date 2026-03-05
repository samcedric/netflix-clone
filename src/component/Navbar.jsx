import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/70 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        
        {/* Clickable Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">

          <div className="font-bold tracking-wide text-4xl text-red-500 hover:text-red-400">
            NETFLIX
          </div>
        </Link>
      </div>
    </div>
  );
}