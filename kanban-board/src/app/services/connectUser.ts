import { Timestamp,
    doc, 
    setDoc,
    deleteDoc,
    collection,
    DocumentData,
    QuerySnapshot,
    onSnapshot} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ConnectedUser } from "../interface/connectedUser";

/**
 * Sets the presence of a user in the Firestore database.
 *
 * This function updates the user's document in the "connectedUsers" collection
 * with the user's name, the current timestamp, and an online status.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} name - The name of the user.
 * @returns {Promise<void>} A promise that resolves when the user's presence is successfully set.
 * @throws {Error} If an error occurs while setting the user's presence.
 *
 */
export const setUserPresence = async (userId: string, email: string) => {
    try {
      const userDocRef = doc(db, "connectedUsers", userId);
      await setDoc(userDocRef, {
        email,
        lastSeen: Timestamp.now(),
        online: true,
      });
    } catch (error) {
      console.error("Error setting user presence:", error);
    }
  };
  

  export const removeUserPresence = async (userId: string) => {
    try {
      const userDocRef = doc(db, "connectedUsers", userId);
      await deleteDoc(userDocRef);
    } catch (error) {
      console.error("Error removing user presence:", error);
    }
  };

  export const listenToConnectedUsers = (dispatch: (users: ConnectedUser[]) => void) => {
    const connectedUsersCollection = collection(db, "connectedUsers");

    return onSnapshot(
        connectedUsersCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<ConnectedUser, "id">),
                lastSeen: doc.data().lastSeen?.toDate()?.toISOString() || null,
            })) as ConnectedUser[];

            dispatch(users);
        }
    );
};