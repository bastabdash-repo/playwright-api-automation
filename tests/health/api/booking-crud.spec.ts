import { test, expect } from "@playwright/test";
import { generateToken } from "../../../helpers/api/auth.helper.ts";
import { createBooking, deleteBooking, updateBooking, partialUpdate } from "../../../helpers/api/booking.helper.ts";
import {validateCreateBookingSchema,validateUpdateBookingSchema} from "../../../helpers/api/schema/booking.schema.ts";


test("End to to API testing ", async ({ request }) => {

    let token: string;
    let bookingId: number;


    //generate token funtion call
    await test.step("Generate token", async () => {
        token = await generateToken(request);
        console.log(`Token generated: ****${token.slice(-4)}`);


    });

    //create booking 

    await test.step("Create booking", async () => {
        const body = await createBooking(request);
        validateCreateBookingSchema(body);
        bookingId = body.bookingid;
        console.log("Generated booking id number is " + bookingId)
        expect(bookingId).toBeTruthy();


    });



    //update booking 
    await test.step("Update Booking", async () => {
        const body = await updateBooking(request, bookingId, token);
        validateUpdateBookingSchema(body);
        expect(body.firstname).toBe("Bastab");

    });
    //Partial update booking 
    await test.step("Partial update booking", async () => {

        const body = await partialUpdate(request, bookingId, token);
        expect(body.additionalneeds).toBe("Dinner");


    });


    //DELETE BOOKING 
    await test.step("Dlete booking id", async () => {

        await deleteBooking(request, bookingId, token);

    });

    //verify that token has been deleted or not 

    await test.step("verify that booking id is deleted ", async () => {

        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);

        expect(response.status()).toBe(404);

    });


});
