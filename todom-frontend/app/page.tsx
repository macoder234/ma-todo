"use client"
import React from 'react';
import Masonry from 'react-masonry-css';
import useSWR, { mutate } from 'swr';
import { fetchAllLists, createList, deleteList, createTaskForList, deleteTaskFromList } from './api';
import { TaskCustomDialog } from './customComponents/taskCustomDialog';
import { ListCustomDialog } from './customComponents/listCustomDialog';
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileMinusIcon } from '@radix-ui/react-icons';
import { ModeToggle } from './customComponents/darkmodeToggle';
import './masonry.css';

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

  const breakpointColumnsObj = {
    default: 5,
    1850: 4,
    1500: 3,
    1150: 2,
    750: 1
  };

  return (
    <div className="p-3 gap-3">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <Card className="min-w-[350px] p-3 my-6">
          <CardHeader>
            <CardTitle>ToDo App</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <ListCustomDialog
              onSave={handleCreateList}
            />
            <ModeToggle/>
          </CardFooter>
        </Card>
        {lists.map((list) => (
          <Card key={list.id} className="min-w-[350px] my-6">
            <CardHeader>
              <CardTitle>{list.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
              <TableBody>
                {list.tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      {/* <CardDescription> */}
                        {task.description}
                      {/* </CardDescription> */}
                    </TableCell>
                    <TableCell className="float-right">
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteTaskFromList(list.name, task.id)}>
                        <FileMinusIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <TaskCustomDialog
                onSave={(value) => handleCreateTaskForList(list.name, value)}
              />
              <Button variant="destructive" onClick={() => handleDeleteList(list.name)}>
                Delete List
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}


