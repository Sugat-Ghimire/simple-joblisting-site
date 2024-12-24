"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "./Pagination";
import { formatDistanceToNow } from "date-fns";
import JobForm from "./JobForm";
import { Trash2, Edit } from "lucide-react";
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted_date: string;
  description: string;
  isFavorite: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  //

  const [showForm, setShowForm] = useState(false);

  //
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [showForm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  const indexOfLastJob = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  //
  const handleUpdate = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormSubmit = (updatedJob: Job) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    setEditingJob(null);
    setShowForm(false);
  };

  //
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete job");
    }
  };

  //
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Job
        </button>
      </div>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          No jobs available at the moment. Please check back later.
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {currentJobs.map((job) => (
              <li
                key={job.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <Link href={`/job/${job.id}`} className="block p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {job.title}
                      </h2>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <p className="text-gray-500 mb-2">{job.location}</p>
                      <p className="text-green-600 font-semibold">
                        {job.salary}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Posted{" "}
                        {job.posted_date
                          ? formatDistanceToNow(new Date(job.posted_date), {
                              addSuffix: true,
                            })
                          : "Date unavailable"}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleUpdate(job)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit job"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalItems={jobs.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showForm && (
        <JobForm
          mode={editingJob ? "edit" : "add"}
          initialData={editingJob}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
}
