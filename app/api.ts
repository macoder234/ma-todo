import axios from 'axios';

const url = 'http://localhost:3001';

// Function to fetch all lists and their tasks
export async function fetchAllLists() {
  try {
    const response = await axios.get(`${url}/api/lists`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
}

// Function to create a new list
export async function createList(name: string) {
  try {
    const response = await axios.post(`${url}/api/lists`, { name }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
}

// Function to update the name of a list
export async function updateList(oldName: string, newName: string) {
  try {
    const response = await axios.put(`${url}/api/lists/${oldName}`, { name: newName }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating list:', error);
    throw error;
  }
}

// Function to delete a list
export async function deleteList(name: string) {
  try {
    const response = await axios.delete(`${url}/api/lists/${name}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
}

// Function to fetch tasks for a specific list
export async function fetchTasksForList(name: string) {
  try {
    const response = await axios.get(`${url}/api/lists/${name}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching tasks for list:', error);
    throw error;
  }
}

// Function to create a new task in a list
export async function createTaskForList(name: string, description: string) {
  try {
    const response = await axios.post(`${url}/api/lists/${name}/tasks`, { description }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating task for list:', error);
    throw error;
  }
}

// Function to update a task in a list
export async function updateTaskForList(listName: string, taskId: number, description: string) {
  try {
    const response = await axios.put(`${url}/api/lists/${listName}/tasks/${taskId}`, { description }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating task for list:', error);
    throw error;
  }
}

// Function to delete a task from a list
export async function deleteTaskFromList(listName: string, taskId: number) {
  try {
    const response = await axios.delete(`${url}/api/lists/${listName}/tasks/${taskId}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting task from list:', error);
    throw error;
  }
}
