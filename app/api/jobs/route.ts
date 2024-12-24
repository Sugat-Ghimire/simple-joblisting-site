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

// POST new job
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, company, location, description, salary } = body;

    const result = await pool.query(
      "INSERT INTO jobs (title, company, location, description, salary, posted_date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [title, company, location, description, salary]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
