import { APIRequestContext, expect, test } from "@playwright/test"



export async function generateToken(request: APIRequestContext): Promise<string> {

    const credential =
    {

        username: process.env.API_USERNAME!,
        password: process.env.API_PASSWORD!,


    }
    const tokenresponse = await request.post("https://restful-booker.herokuapp.com/auth", { headers: { "Content-Type": "application/json" }, data: credential })

    expect(tokenresponse.status()).toBe(200);
    expect(tokenresponse.ok()).toBeTruthy();
    const healthjsonbody = await tokenresponse.json();
    expect(healthjsonbody.token).toBeTruthy();
    // return string 
    return healthjsonbody.token;

}