"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/services/api";
import toast from "react-hot-toast";

const CATEGORIES = [
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

export default function JobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (form.title.length > 120) errs.title = "Title is too long (max 120)";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.description.length > 2000)
      errs.description = "Description is too long (max 2000)";
    if (
      form.contactEmail &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        form.contactEmail
      )
    ) {
      errs.contactEmail = "Invalid email format";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createJob(form);
      toast.success("Job request created successfully!");
      router.push("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to create job request";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 shadow-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";
  const errorClasses = "text-rose-500 text-xs mt-1.5 font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClasses}>
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Fix leaking kitchen faucet"
          value={form.title}
          onChange={handleChange}
          className={`${inputClasses} ${
            errors.title ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : ""
          }`}
        />
        {errors.title && <p className={errorClasses}>{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClasses}>
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Provide a detailed description of the issue or task..."
          value={form.description}
          onChange={handleChange}
          className={`${inputClasses} resize-none ${
            errors.description ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : ""
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className={errorClasses}>{errors.description}</p>
          )}
          <span className="text-xs font-medium text-slate-500 ml-auto">
            {form.description.length}/2000
          </span>
        </div>
      </div>

      {/* Category & Location row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`${inputClasses} cursor-pointer font-medium`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-white text-slate-900">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Building A, Unit 204"
            value={form.location}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Contact Name & Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contactName" className={labelClasses}>
            Contact Name
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            placeholder="Your full name"
            value={form.contactName}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className={labelClasses}>
            Contact Email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="you@example.com"
            value={form.contactEmail}
            onChange={handleChange}
            className={`${inputClasses} ${
              errors.contactEmail ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : ""
            }`}
          />
          {errors.contactEmail && (
            <p className={errorClasses}>{errors.contactEmail}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-slate-900/10 hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white/80"
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
              Creating Request...
            </span>
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </form>
  );
}
