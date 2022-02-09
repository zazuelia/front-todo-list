import { User } from "src/app/global/user-interface";

export interface Tasks {
    
    taskId?: number;     // Task ID
    taskName: string;   // Task name
    taskDate?: Date;     // Task date
    checked: boolean; // Checked       
    lastUpdate?: Date    // Last Update
    user?: User
}