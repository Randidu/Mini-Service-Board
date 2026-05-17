import JobForm from "@/components/JobForm";
import Link from "next/link";

export const metadata = {
  title: "New Request — ServiceBoard",
  description: "Create a new service request.",
};

export default function NewJobPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 mb-8 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all requests
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">New Service Request</h1>
        <p className="mt-2 text-slate-600 text-lg">Fill in the details below to submit a new request.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <JobForm />
      </div>
    </div>
  );
}
