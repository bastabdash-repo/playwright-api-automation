import { APIRequestContext, expect } from "@playwright/test";


//* ----------  Create (POST) ---------- */

export async function createBooking(request: APIRequestContext) {
  const bookingDetails = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-12-30",
      checkout: "2026-01-01",
    },
    additionalneeds: "Breakfast",
  };

  const response = await request.post("https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: bookingDetails,
    }
  );

  expect(response.status()).toBe(200);
  return response.json();
}

/* ----------  UPDATE (PUT) ---------- */

export async function updateBooking(request: APIRequestContext, bookingId: number, token: string) {


  const updatebookingDetails = {
    firstname: "Bastab",
    lastname: "Dash",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-12-30",
      checkout: "2026-01-01",
    },
    additionalneeds: "Breakfast",
  };

  const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {

      headers:
      {

        "Content-Type": "application/json",
        "Accept": "application/json",
        Cookie: `token=${token}`

      }, data: updatebookingDetails,
    }
  )
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
        Cookie: `token=${token}`,
      },
      data: {
        additionalneeds: "Dinner",
      },
    }
  );

  expect(response.status()).toBe(200);
  return response.json();
}


/* ----------  DELETE (delete) ---------- */
export async function deleteBooking(request: APIRequestContext, bookingId: number, token: string) {
  const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    }
  )

  expect(response.status()).toBe(201);
}