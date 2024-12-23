import JobDetails from "@/components/JobDetails";

export default function JobPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <JobDetails id={params.id} />
    </main>
  );
}
