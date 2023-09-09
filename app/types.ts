export interface Task {
  id: number;
  description: string;
  createdAt: string; // Adjust the data type if needed (e.g., Date)
}

export interface List {
  id: number;
  name: string;
  tasks: Task[];
}

export interface ListWithTasks {
  id: number;
  name: string;
  tasks: Task[];
}