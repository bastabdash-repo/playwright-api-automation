import{expect,test} from "@playwright/test"

test("API health checkup",async ({request}) =>{

    
const healthresponse = await request.get("https://restful-booker.herokuapp.com/ping")
console.log(healthresponse.statusText())
//assertion od response status text
expect(healthresponse.statusText()).toBe("Created")
console.log(healthresponse.status())
//assertion od response status
expect(healthresponse.status()).toBe(201)
expect(healthresponse.ok()).toBeTruthy();




})







