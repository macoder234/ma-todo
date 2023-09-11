"use client"
import useSWR, { mutate } from 'swr';
import { fetchAllLists, createList, deleteList, createTaskForList, deleteTaskFromList } from './api';
import { DialogDemo } from './dialog';
import { ListWithTasks, Task } from './types';
import { Button } from "@/components/ui/button"

export default function Home() {
  const { data: lists, error } = useSWR<ListWithTasks[]>('/api/lists', fetchAllLists);

  if (error) return <div>Error loading data</div>;
  if (!lists) return <div>Loading...</div>;

  async function handleCreateList(value: string) {
    if (value) {
      await createList(value);
      // Refetch lists after creating a new one
      mutate('/api/lists');
    }
  }

    async function handleDeleteList(name: string) {
    await deleteList(name);
    // Refetch lists after deletion
    mutate('/api/lists');
  }

  async function handleCreateTaskForList(listName: string, value: string) {
    if (value) {
      await createTaskForList(listName, value);
      // Refetch lists after adding a task
      mutate('/api/lists');
    }
  }

  async function handleDeleteTaskFromList(listName: string, taskId: number) {
    await deleteTaskFromList(listName, taskId);
    // Refetch lists after deleting a task
    mutate('/api/lists');
  }

  return (
    <div>
      <DialogDemo
        headerOfDialog="Add New List"
        bodyOfDialog="Provide the name of the new list"
        labelOfString="List Name"
        onSave={handleCreateList}
      />
      {lists.map((list) => (
        <div key={list.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{list.name}</h2>
          <ul>
            {list.tasks.map((task) => (
              <li key={task.id}>
                {task.description}
                <Button onClick={() => handleDeleteTaskFromList(list.name, task.id)}>Delete Task</Button>
              </li>
            ))}
          </ul>
          <DialogDemo
            headerOfDialog="Add New Task"
            bodyOfDialog="Provide the description for the task"
            labelOfString="Task Description"
            onSave={(value) => handleCreateTaskForList(list.name, value)}
          />
          <Button onClick={() => handleDeleteList(list.name)}>Delete List</Button>
        </div>
      ))}
    </div>
  );
}
