import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  postedDate: string;
  isFavorite: boolean;
}

interface JobState {
  jobs: Job[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  applyForJob: (jobId: string, applicationData: any) => void;
}
//this is just for testing,
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "ABCDEF",
    location: "remote",
    description: `We are seeking an experienced React developer to lead our frontend team.
    The ideal candidate will have a strong understanding of React, Redux, and modern JavaScript practices.
    You'll be responsible for architecting and implementing new features, as well as maintaining and improving existing code.`,
    salary: "$120,000 - $160,000",
    postedDate: "2023-06-01",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "BSAHDFG",
    location: "New remote",
    description: `Join our dynamic team to build scalable web applications using modern technologies.
    We're looking for a Full Stack Engineer proficient in both frontend and backend development.
    Experience with React, Node.js, and SQL databases is required.`,
    salary: "$100,000 - $140,000",
    postedDate: "2023-06-03",
    isFavorite: false,
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "SASFAFG",
    location: "Remote",
    description: `We're looking for a creative UX/UI designer to craft beautiful and intuitive user interfaces.
    The ideal candidate will have a strong portfolio demonstrating their ability to create engaging digital experiences.
    Proficiency in Figma and Adobe Creative Suite is required.`,
    salary: "$90,000 - $120,000",
    postedDate: "2023-06-05",
    isFavorite: false,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "DSADFGG",
    location: "remote",
    description: `Help us build and maintain robust CI/CD pipelines and cloud infrastructure.
    We're seeking a DevOps Engineer with experience in AWS, Docker, and Kubernetes.
    You'll be responsible for improving our deployment processes and ensuring high availability of our services.`,
    salary: "$110,000 - $150,000",
    postedDate: "2023-06-07",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "AFAFGGG",
    location: "remote",
    description: `Apply your expertise in machine learning and data analysis to solve complex business problems.
    We're looking for a Data Scientist with a strong background in statistics and programming.
    Experience with Python, R, and big data technologies is required.`,
    salary: "$130,000 - $170,000",
    postedDate: "2023-06-09",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "SFGSGSG",
    location: "remote",
    description: `Apply your expertise in machine learning and data analysis to solve complex business problems.
    We're looking for a Data Scientist with a strong background in statistics and programming.
    Experience with Python, R, and big data technologies is required.`,
    salary: "$130,000 - $170,000",
    postedDate: "2023-06-09",
    isFavorite: false,
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "SGSGSGHSGSG",
    location: "remote",
    description: `Apply your expertise in machine learning and data analysis to solve complex business problems.
    We're looking for a Data Scientist with a strong background in statistics and programming.
    Experience with Python, R, and big data technologies is required.`,
    salary: "$130,000 - $170,000",
    postedDate: "2023-06-09",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Data Scientist",
    company: "SFGSGSGSG",
    location: "remote",
    description: `Apply your expertise in machine learning and data analysis to solve complex business problems.
    We're looking for a Data Scientist with a strong background in statistics and programming.
    Experience with Python, R, and big data technologies is required.`,
    salary: "$130,000 - $170,000",
    postedDate: "2023-06-09",
    isFavorite: false,
  },
  {
    id: "9",
    title: "Data Scientist",
    company: "SGSGSGGSGSG",
    location: "remote",
    description: `Apply your expertise in machine learning and data analysis to solve complex business problems.
    We're looking for a Data Scientist with a strong background in statistics and programming.
    Experience with Python, R, and big data technologies is required.`,
    salary: "$130,000 - $170,000",
    postedDate: "2023-06-09",
    isFavorite: false,
  },
];

export const useJobStore = create<JobState>()(
  persist(
    (set) => ({
      jobs: initialJobs,
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => {
          const updatedJobs = state.jobs.map((job) =>
            job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
          );
          const updatedFavorites = updatedJobs.find((job) => job.id === id)
            ?.isFavorite
            ? [...state.favorites, id]
            : state.favorites.filter((favId) => favId !== id);
          return { jobs: updatedJobs, favorites: updatedFavorites };
        }),
      applyForJob: (jobId, applicationData) => {
        console.log("Application submitted:", { jobId, ...applicationData });
      },
    }),
    {
      name: "job-storage",
    }
  )
);
