# Job Listing Site

This is a full-stack job listing application built with Next.js. It allows users to view, add, edit, and delete job listings. The backend is powered by PostgreSQL.

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sugat-Ghimire/simple-joblisting-site
   cd joblistingsite
   ```

2. Install dependencies:

   npm install

3. Set up environment variables: Create a .env.local file in the root directory and add your PostgreSQL credentials:

   ```env
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DATABASE=your_db
   ```

4. Set up the database:
   I have used Docker to run PostgreSQL, but feel free to use any method you prefer.

Running the Development Server:

npm run dev

Open http://localhost:3000 with your browser to see the result.

Note:

This project is still in development so may have inconsistencies in code and features.
