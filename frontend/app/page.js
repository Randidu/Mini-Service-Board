"use client";

import { useEffect, useState, useMemo } from "react";
import { getJobs } from "@/services/api";
import JobCard from "@/components/JobCard";

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Joinery",
  "Painting",
  "Cleaning",
  "Landscaping",
  "HVAC",
  "General",
  "Other",
];

const STATUSES = ["All", "Open", "In Progress", "Closed"];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (category !== "All") params.category = category;
        if (status !== "All") params.status = status;
        if (debouncedSearch.trim()) params.search = debouncedSearch.trim();

        const result = await getJobs(params);
        setJobs(result.data);
      } catch (err) {
        setError("Failed to load job requests. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [category, status, debouncedSearch]);

  const jobCount = jobs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Service Requests
        </h1>
        <p className="mt-2 text-slate-600 text-lg">
          Manage and track all maintenance jobs in one place
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              suppressHydrationWarning
              className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer min-w-[140px] shadow-sm font-medium"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              suppressHydrationWarning
              className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer min-w-[140px] shadow-sm font-medium"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-white text-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters count */}
        {!loading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span>
              Showing{" "}
              <span className="text-indigo-600 font-semibold">{jobCount}</span>{" "}
              {jobCount === 1 ? "request" : "requests"}
            </span>
            {(category !== "All" || status !== "All" || debouncedSearch) && (
              <button
                onClick={() => {
                  setCategory("All");
                  setStatus("All");
                  setSearch("");
                }}
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-52 bg-white/50 border border-slate-100 rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 mb-4 border border-rose-100">
            <svg
              className="w-8 h-8 text-rose-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Connection Error
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">{error}</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-24 animate-fade-in border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 mb-4 border border-indigo-100">
            <svg
              className="w-8 h-8 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No Requests Found
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            {debouncedSearch || category !== "All" || status !== "All"
              ? "Try adjusting your filters to find what you're looking for."
              : "Get started by creating your very first service request."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <div
              key={job._id}
              className={`animate-fade-in-up opacity-0 stagger-${
                (i % 8) + 1
              }`}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
