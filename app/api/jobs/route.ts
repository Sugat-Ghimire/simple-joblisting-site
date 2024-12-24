import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all jobs
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY posted_date DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

//POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, company, location, description, salary } = body;

    const result = await pool.query(
      `INSERT INTO jobs (
        title, 
        company, 
        location, 
        description, 
        salary, 
        posted_date
      ) 
      VALUES (
        $1, $2, $3, $4, $5, 
        CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kathmandu'
      ) 
      RETURNING *, 
      to_char(posted_date AT TIME ZONE 'Asia/Kathmandu', 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') as posted_date`,
      [title, company, location, description, salary]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
