import { neon } from "@neondatabase/serverless";

export async function initNeonClient() {
    const sql = neon(process.env.DATABASE_URL);
    return sql
}