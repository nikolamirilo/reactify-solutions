"use server";
import { APP_URL } from "@/constants";
import { FetchOptions } from "@/types";

export async function fetchData(path: string, options: FetchOptions) {
  try {
    const { method, cache, body, revalidate } = options;
    const res = await fetch(`${APP_URL}${path}`, {
      method,
      cache: cache || "force-cache",
      body,
      next: { revalidate },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.log(res.statusText);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
}
