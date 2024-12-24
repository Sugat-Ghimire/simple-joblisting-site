import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET single job
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [
      params.id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PUT update job
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, company, location, description, salary } = body;

    const result = await pool.query(
      "UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, salary = $5 WHERE id = $6 RETURNING *",
      [title, company, location, description, salary, params.id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query("DELETE FROM jobs WHERE id = $1", [params.id]);
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
