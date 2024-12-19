import { db } from "../config/FirebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";




export const GetFavList=async (user)=>{
    const docSnap = await getDoc(doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress));

    if(docSnap.exists()){
        return docSnap.data();
    }
    else {
        await setDoc(doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress), {
            email:user?.primaryEmailAddress?.emailAddress,
            favorites: []
        });
    }

}