"use client";

import { useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import ApplicationForm from "./ApplicationForm";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";

export default function JobDetails({ id }: { id: string }) {
  const { jobs, toggleFavorite } = useJobStore();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return <div className="text-center text-gray-600">Job not found</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <button
            onClick={() => toggleFavorite(job.id)}
            className={`p-2 rounded-full ${
              job.isFavorite
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500"
            } hover:bg-opacity-80 transition-colors duration-300`}
            aria-label={
              job.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
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
            Posted{" "}
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
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
