import JobListings from "@/components/JobListings";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-20 text-center text-gray-800">
        Job Listings
      </h1>
      <JobListings />
    </main>
  );
}
