"use client"
import useSWR from 'swr';
import { fetchAllLists } from './api'; // Import the fetchAllLists function and types
import { Task, List, ListWithTasks } from './types';

export default function Home() {
  // Example: Fetch a list of lists
  const { data, error } = useSWR<ListWithTasks[]>('/api/lists', fetchAllLists);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  function renderTasks(tasks: Task[]) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {data.map((list) => (
        <div key={list.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{list.name}</h2>
          {renderTasks(list.tasks)}
        </div>
      ))}
    </div>
  );
}
