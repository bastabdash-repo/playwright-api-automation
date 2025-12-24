import { expect } from "@playwright/test";

/**
 * Validates response schema for CREATE booking
 */
export function validateCreateBookingSchema(response: any) {
    expect(response).toHaveProperty("bookingid");
    expect(typeof response.bookingid).toBe("number");

    expect(response).toHaveProperty("booking");

    const booking = response.booking;

    expect(booking).toHaveProperty("firstname");
    expect(typeof booking.firstname).toBe("string");

    expect(booking).toHaveProperty("lastname");
    expect(typeof booking.lastname).toBe("string");

    expect(booking).toHaveProperty("totalprice");
    expect(typeof booking.totalprice).toBe("number");

    expect(booking).toHaveProperty("depositpaid");
    expect(typeof booking.depositpaid).toBe("boolean");

    expect(booking).toHaveProperty("bookingdates");

    expect(booking.bookingdates).toHaveProperty("checkin");
    expect(typeof booking.bookingdates.checkin).toBe("string");

    expect(booking.bookingdates).toHaveProperty("checkout");
    expect(typeof booking.bookingdates.checkout).toBe("string");
}

/**
 * Validates response schema for UPDATE / PATCH
 */
export function validateUpdateBookingSchema(response: any) {
    expect(response).toHaveProperty("firstname");
    expect(response).toHaveProperty("lastname");
    expect(response).toHaveProperty("totalprice");
    expect(response).toHaveProperty("depositpaid");
    expect(response).toHaveProperty("bookingdates");
}
