import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page Not Found | SoloPharma';
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#f8fbff] px-4 py-20">
      <div className="text-center max-w-lg">
        {/* Giant 404 */}
        <div className="relative mb-8 select-none">
          <span className="block text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#0077b6] to-[#00b4d8] opacity-20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#0077b6]" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Page Not Found</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-sky-300/30 hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:border-[#0077b6] hover:text-[#0077b6] font-bold px-7 py-3.5 rounded-2xl transition-all hover:bg-sky-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
