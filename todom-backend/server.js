const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001; // You can change the port as needed

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());



const db = new sqlite3.Database('./todo.db');

// Retrieve all lists and their tasks to render on the main page
app.get('/api/lists', (req, res) => {
  // Retrieve lists from the 'lists' table
  db.all('SELECT * FROM lists', (err, lists) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Fetch tasks for each list
    const listsWithTasks = [];

    lists.forEach((list) => {
      db.all(`SELECT id, description, createdAt FROM ${list.name}`, (err, tasks) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        listsWithTasks.push({ ...list, tasks });
        if (listsWithTasks.length === lists.length) {
          res.json(listsWithTasks);
        }
      });
    });
  });
});

// Create a new to-do list
app.post('/api/lists', (req, res) => {
  const { name } = req.body;

  // Check if 'name' is present and not empty
  if (!name) {
    return res.status(400).json({ error: 'Name field is required' });
  }

  // Create a new table for the list if it doesn't exist
  const tableName = name.replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters from the name for table name

  // Check if the list name already exists in the 'lists' table
  db.get('SELECT * FROM lists WHERE name = ?', [name], (err, existingList) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (existingList) {
      return res.status(400).json({ error: 'List name already exists' });
    }

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Insert a new list into the 'lists' table
        db.run('INSERT INTO lists (name) VALUES (?)', [name], (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'List created successfully' });
        });
      });
    });
  });
});

// Update the name of a to-do list
app.put('/api/lists/:name', (req, res) => {
  const listName = req.params.name;
  const { name } = req.body;

  // Update the name of the list in the 'lists' table
  db.run('UPDATE lists SET name = ? WHERE name = ?', [name, listName], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Also update the corresponding task table name
    db.run(`ALTER TABLE ${listName} RENAME TO ${name}`, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'List name updated successfully' });
    });
  });
});

// Delete a to-do list
app.delete('/api/lists/:name', (req, res) => {
  const listName = req.params.name;

  // Delete the list from the 'lists' table
  db.run('DELETE FROM lists WHERE name = ?', [listName], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Also delete the corresponding tasks table
    db.run(`DROP TABLE IF EXISTS ${listName}`, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'List deleted successfully' });
    });
  });
});

// Create a new task in a to-do list
app.post('/api/lists/:name/tasks', (req, res) => {
  const listName = req.params.name;
  const { description } = req.body;

  // Insert a new task into the list's table
  db.run(`INSERT INTO ${listName} (description, createdAt) VALUES (?, datetime("now"))`, [description], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Task created successfully' });
  });
});

// Update a task in a to-do list
app.put('/api/lists/:listName/tasks/:taskId', (req, res) => {
  const listName = req.params.listName;
  const taskId = req.params.taskId;
  const { description } = req.body;

  // Update the task in the list's table
  db.run(`UPDATE ${listName} SET description = ? WHERE id = ?`, [description, taskId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Task updated successfully' });
  });
});

// Delete a task from a to-do list
app.delete('/api/lists/:listName/tasks/:taskId', (req, res) => {
  const listName = req.params.listName;
  const taskId = req.params.taskId;

  // Delete the task from the list's table
  db.run(`DELETE FROM ${listName} WHERE id = ?`, [taskId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

