"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById, deleteJob } from "@/services/api";
import StatusDropdown from "@/components/StatusDropdown";
import toast from "react-hot-toast";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const result = await getJobById(id);
        setJob(result.data);
      } catch (err) {
        setError(err.response?.status === 404 ? "Job request not found." : "Failed to load job.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteJob(id);
      toast.success("Job request deleted");
      router.push("/");
    } catch (err) {
      toast.error("Failed to delete job");
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleStatusUpdate = (updatedJob) => {
    setJob(updatedJob);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="skeleton h-8 w-48 mb-8 bg-slate-200 rounded-lg" />
        <div className="skeleton h-64 mb-6 bg-slate-200 rounded-2xl" />
        <div className="skeleton h-40 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="py-20 animate-fade-in border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 mb-4 border border-rose-100">
            <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Error</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            &larr; Go back home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 mb-8 group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all requests
      </Link>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4 leading-snug">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  {job.category || "General"}
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-sm font-medium text-slate-500">{formattedDate}</span>
              </div>
            </div>
            <StatusDropdown jobId={job._id} currentStatus={job.status} onUpdate={handleStatusUpdate} />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</h2>
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {job.location && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                <p className="text-slate-900 font-semibold">{job.location}</p>
              </div>
            )}
            {job.contactName && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Name</p>
                <p className="text-slate-900 font-semibold">{job.contactName}</p>
              </div>
            )}
            {job.contactEmail && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Email</p>
                <a href={`mailto:${job.contactEmail}`} className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">{job.contactEmail}</a>
              </div>
            )}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-slate-900 font-semibold">{job.status}</p>
            </div>
          </div>
        </div>

        {/* Footer: Delete */}
        <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Request
            </button>
          ) : (
            <div className="flex items-center gap-4 animate-fade-in w-full justify-between sm:justify-start">
              <p className="text-sm font-semibold text-rose-500 hidden sm:block">Delete this request permanently?</p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={handleDelete} disabled={deleting} className="flex-1 sm:flex-none bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 shadow-sm shadow-rose-500/20">
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button onClick={() => setShowConfirm(false)} className="flex-1 sm:flex-none bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2.5 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
