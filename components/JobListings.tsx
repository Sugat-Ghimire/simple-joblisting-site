"use client";

import { useState } from "react";
import Link from "next/link";
import { useJobStore } from "@/store/useJobStore";
import Pagination from "./Pagination";
import { formatDistanceToNow } from "date-fns";

const ITEMS_PER_PAGE = 5;

export default function JobListings() {
  const jobs = useJobStore((state) => state.jobs);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="space-y-6">
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
                      <p className="text-gray-600 mb-1">{job.company}</p>
                      <p className="text-gray-500 mb-2">{job.location}</p>
                      <p className="text-sm text-gray-400">
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.postedDate), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={jobs.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
