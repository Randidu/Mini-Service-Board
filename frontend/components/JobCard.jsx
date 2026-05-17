"use client";

import Link from "next/link";

const STATUS_COLORS = {
  Open: "bg-emerald-50 text-emerald-600 border-emerald-200",
  "In Progress": "bg-amber-50 text-amber-600 border-amber-200",
  Closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const CATEGORY_ICONS = {
  Plumbing: "🔧",
  Electrical: "⚡",
  Carpentry: "🪚",
  Joinery: "🚪",
  Painting: "🎨",
  Cleaning: "🧹",
  Landscaping: "🌿",
  HVAC: "❄️",
  General: "🔩",
  Other: "📋",
};

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="group relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 hover:border-indigo-300 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 cursor-pointer">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Header: Category & Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span>{CATEGORY_ICONS[job.category] || "📋"}</span>
              {job.category || "General"}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                STATUS_COLORS[job.status] || STATUS_COLORS.Open
              }`}
            >
              {job.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
            {job.title}
          </h3>

          {/* Description preview */}
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>

          {/* Footer: Location & Arrow */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {job.location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job.location}
              </span>
            )}
            <span className="text-indigo-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
