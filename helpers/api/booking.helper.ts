import { APIRequestContext, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// 🔹 Load test data once
const bookingData = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "test-data", "bookingData.json"),
    "utf-8"
  )
);

/* ---------- CREATE (POST) ---------- */
export async function createBooking(request: APIRequestContext) {
  const response = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: bookingData.createBooking
    }
  );

  expect(response.status()).toBe(200);
  return response.json();
}

/* ---------- UPDATE (PUT) ---------- */
export async function updateBooking(
  request: APIRequestContext,
  bookingId: number,
  token: string
) {
  const response = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`
      },
      data: bookingData.updateBooking
    }
  );

  expect(response.status()).toBe(200);
  return response.json();
}

/* ---------- PARTIAL UPDATE (PATCH) ---------- */
export async function partialUpdate(
  request: APIRequestContext,
  bookingId: number,
  token: string
) {
  const response = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`
      },
      data: bookingData.partialUpdate
    }
  );

  expect(response.status()).toBe(200);
  return response.json();
}

/* ---------- DELETE ---------- */
export async function deleteBooking(
  request: APIRequestContext,
  bookingId: number,
  token: string
) {
  const response = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`
      }
    }
  );

  expect(response.status()).toBe(201);
}
