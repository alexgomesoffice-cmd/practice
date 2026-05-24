import { verifyToken } from "./jwt";

export async function getUserFromToken(token:string){
    try{
        const payload = await verifyToken(token);
        return{
            userId: payload.userId as number,
            email: payload.email as string
        }
    }
    catch(error){
        console.error("Error verifying token:", error);
        return null;
    }
}