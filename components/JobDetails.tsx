"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import ApplicationForm from "./ApplicationForm";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  postedDate: string;
  isFavorite: boolean;
}

export default function JobDetails({ id }: { id: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job");
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);
  // date formatting utility
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date unavailable";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date unavailable";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Date unavailable";
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  if (!job)
    return <div className="text-center text-gray-600">Job not found</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <button
            onClick={async () => {
              try {
                const response = await fetch(`/api/jobs/${id}/favorite`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isFavorite: !job.isFavorite }),
                });
                if (!response.ok)
                  throw new Error("Failed to update favorite status");
                setJob({ ...job, isFavorite: !job.isFavorite });
              } catch (err) {
                console.error("Error updating favorite status:", err);
              }
            }}
            className={`p-2 rounded-full ${
              job.isFavorite
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500"
            } hover:bg-opacity-80 transition-colors duration-300`}
          >
            <Heart
              className={`w-6 h-6 ${job.isFavorite ? "fill-current" : ""}`}
            />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-2">{job.company}</p>
          <p className="text-lg text-gray-500 mb-2">{job.location}</p>
          <p className="text-lg font-semibold text-green-600 mb-2">
            {job.salary}
          </p>
          <p className="text-sm text-gray-400">
            Posted {formatDate(job.postedDate)}
          </p>
        </div>
        <div className="prose max-w-none mb-6">
          <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
          <p>{job.description}</p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => setShowApplicationForm(!showApplicationForm)}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {showApplicationForm ? "Hide Application Form" : "Apply for Job"}
          </button>
        </div>
      </div>
      {showApplicationForm && (
        <div className="border-t border-gray-200 p-6">
          <ApplicationForm jobId={job.id} />
        </div>
      )}
    </div>
  );
}
