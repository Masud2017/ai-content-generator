import { firebaseFireStore } from "@/configs/firebaseAdmin";

export async function POST(request : Request) {
    console.log("A new user has been created ..")
    let body = await request.json();
    console.log("Your user id : "+ body["data"]["email_addresses"][0]["id"])


    const docRef = firebaseFireStore.collection('user_plans').doc(body["data"]["email_addresses"][0]["email_address"]);
    await docRef.set({
        // id: body["data"]["email_addresses"][0]["id"],
        // email: body["data"]["email_addresses"][0]["email_address"],
        limit : 1,
        plan : 0, // 0 -> basic ; 1 -> lifetime
        createdAt: Date.now(),
        
      }, {merge: true});
      

    return Response.json(body)
}
