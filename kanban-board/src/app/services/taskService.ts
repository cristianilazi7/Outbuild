import { collection, 
         addDoc, 
         updateDoc, 
         doc, 
         DocumentData, 
         QuerySnapshot, 
         onSnapshot,
         getDoc,
         deleteDoc} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Task } from "../interface/task";

/**
 * Adds a new task to the "tasks" collection in Firestore.
 *
 * @param {Omit<Task, "id">} task - Task object without the `id` field.
 * @returns {Promise<Task>} - A promise that resolves to the created task with an auto-generated `id`.
 *
 * @example
 * const newTask = { content: "Finish report", status: "To Do" };
 * addTaskToFirestoreService(newTask)
 *   .then((task) => console.log("Task added:", task))
 *   .catch((error) => console.error("Error:", error));
 */
export const addTaskToFirestoreService = async (task: Omit<Task, "id">): Promise<Task> => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { ...task, id: docRef.id }; // Ensure this returns a Task
  };


/**
 * Actualiza el estado (status) de una tarea en Firestore.
 * @param taskId - ID de la tarea a actualizar.
 * @param newStatus - Nuevo estado de la tarea.
 * @returns Una promesa que se resuelve cuando se completa la actualización.
 */
export const updateTaskStatusInFirestoreService = async (
    taskId: string,
    newStatus: Task["status"]
  ): Promise<Task> => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });
      // Fetch and return the updated task
    const updatedTaskDoc = await getDoc(taskRef);
    return { id: updatedTaskDoc.id, ...updatedTaskDoc.data() } as Task;
    } catch (error) {
      console.error("Error updating task status in Firestore:", error);
      throw error;
    }
  };

  /**
 * Updates the content of a task in Firestore.
 * @param taskId - ID of the task to update.
 * @param newContent - New content for the task.
 * @returns A promise that resolves with the updated task.
 */
export const updateTaskContentInFirestoreService = async (
    taskId: string,
    newContent: string
  ): Promise<Task> => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { content: newContent });
  
      // Fetch and return the updated task
      const updatedTaskDoc = await getDoc(taskRef);
      return { id: updatedTaskDoc.id, ...updatedTaskDoc.data() } as Task;
    } catch (error) {
      console.error("Error updating task content in Firestore:", error);
      throw error;
    }
  };

  /**
 * Deletes a task from Firestore.
 * @param taskId - ID of the task to delete.
 * @returns A promise that resolves when the task is deleted.
 */
export const deleteTaskFromFirestoreService = async (taskId: string): Promise<void> => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task from Firestore:", error);
      throw error;
    }
  };

  export const listenToTasksInFirestore = (callback: (tasks: Task[]) => void) => {
    const tasksCollection = collection(db, "tasks");
  
    return onSnapshot(tasksCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      
      callback(tasks); // Llama al callback con las tareas actualizadas
    });
  };

  export const updateTaskEditingStatusInFirestore = async (
    taskId: string,
    fieldsToUpdate: { lastEditedBy?: string; editing?: boolean }
  ): Promise<void> => {
    try {
        console.log("taskId", taskId);
        console.log("fieldsToUpdate", fieldsToUpdate);
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, fieldsToUpdate);
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
      throw error;
    }
  };