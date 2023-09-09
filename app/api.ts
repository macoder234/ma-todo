import axios from 'axios';
// Function to fetch all lists and their tasks
const url = 'http://localhost:3001';

export async function fetchAllLists() {
  try {
    const response = await axios.get(url + '/api/lists', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    console.info('response', response);
    
    // Axios automatically parses the JSON response
    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
}


// Function to create a new list
export async function createList(name: string) {
  try {
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
}

// Function to update the name of a list
export async function updateList(oldName: string, newName: string) {
  try {
    const response = await fetch(`/api/lists/${oldName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating list:', error);
    throw error;
  }
}

// Function to delete a list
export async function deleteList(name: string) {
  try {
    const response = await fetch(`/api/lists/${name}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
}

// Function to fetch tasks for a specific list
export async function fetchTasksForList(name: string) {
  try {
    const response = await fetch(`/api/lists/${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks for list:', error);
    throw error;
  }
}

// Function to create a new task in a list
export async function createTaskForList(name: string, description: string) {
  try {
    const response = await fetch(`/api/lists/${name}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating task for list:', error);
    throw error;
  }
}

// Function to update a task in a list
export async function updateTaskForList(listName: string, taskId: number, description: string) {
  try {
    const response = await fetch(`/api/lists/${listName}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating task for list:', error);
    throw error;
  }
}

// Function to delete a task from a list
export async function deleteTaskFromList(listName: string, taskId: number) {
  try {
    const response = await fetch(`/api/lists/${listName}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting task from list:', error);
    throw error;
  }
}
