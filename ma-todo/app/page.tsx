"use client"
import useSWR, { mutate } from 'swr';
import { fetchAllLists, createList, deleteList, createTaskForList, deleteTaskFromList } from './api';
import { CustomDialog } from './customComponents/custom-dialog';
import { ListWithTasks, Task } from './types';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FileMinusIcon } from '@radix-ui/react-icons';


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
      <CustomDialog
        headerOfDialog="Add New List"
        bodyOfDialog="Provide the name of the new list"
        labelOfString="List Name"
        onSave={handleCreateList}
      />
      {lists.map((list) => (
        <Card key={list.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{list.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {list.tasks.map((task) => (
                <li key={task.id}>
                  {task.description}
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteTaskFromList(list.name, task.id)}>
                    <FileMinusIcon className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CustomDialog
              headerOfDialog="Add New Task"
              bodyOfDialog="Provide the description for the task"
              labelOfString="Task Description"
              onSave={(value) => handleCreateTaskForList(list.name, value)}
            />
            <Button variant="destructive" onClick={() => handleDeleteList(list.name)}>
              Delete List
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

