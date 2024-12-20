export interface Task {
    id: string;
    content: string;
    status: "To Do" | "In Progress" | "Done";
    lastEditedBy?: string;
    editing?: boolean;
  }