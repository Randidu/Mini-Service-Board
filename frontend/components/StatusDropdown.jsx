"use client";

import { useState } from "react";
import { updateJobStatus } from "@/services/api";
import toast from "react-hot-toast";

const STATUSES = ["Open", "In Progress", "Closed"];

const STATUS_STYLES = {
  Open: "text-emerald-700 bg-emerald-50",
  "In Progress": "text-amber-700 bg-amber-50",
  Closed: "text-slate-600 bg-slate-50",
};

export default function StatusDropdown({ jobId, currentStatus, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;

    setLoading(true);
    try {
      const result = await updateJobStatus(jobId, newStatus);
      toast.success(`Status updated to "${newStatus}"`);
      if (onUpdate) onUpdate(result.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update status";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={loading}
        className={`border border-slate-200 rounded-xl px-4 py-2.5 pr-10 font-bold text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm ${
          STATUS_STYLES[currentStatus] || "text-slate-900 bg-white"
        }`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="bg-white text-slate-900 font-medium">
            {s}
          </option>
        ))}
      </select>
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-4 w-4 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
