# ToDoM

A simple todo web application built with Next.js, Express.js, SQLite, and SWR.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

ToDoM is a web application that allows users to create and manage to-do lists with tasks. It provides a user-friendly interface for adding, updating, and deleting lists and tasks.
![alt text](https://raw.githubusercontent.com/macoder234/todom/main/img/lists_dark_desktop.jpg)

## Features

- Create, edit, and delete to-do lists.
- Add, update, and remove tasks within each list.
- Real-time data updates using SWR.
- Clean and responsive user interface.

## Tech Stack

- [Next.js](https://nextjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [SQLite](https://www.sqlite.org/) - Database
- [SWR](https://swr.vercel.app/) - React data fetching library
- [shadcn/ui](https://ui.shadcn.com/) - Components library

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- Git

### Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:macoder234/todom.git
    ```
    Note: above is for cloning via SSH, you can use any other methods to get repository

2. Navigate to the project directory:   
    ```bash
    cd todom
    ```

3. Install the dependencies for both the frontend and backend:
    ```bash
    # Install frontend dependencies
    cd todom-frontend
    npm install

    # Install backend dependencies
    cd ../todom-backend
    npm install
    ```

## Usage

1. Start the Express.js backend server:
    ```bash
    # From the project root directory
    cd todom-backend
    npm run start
    ```
    The backend server will run on port 3001 by default.

2. Start the Next.js frontend:
    ```bash
    # From the project root directory
    cd todom-frontend
    npm run dev
    ```
    The frontend development server will run on port 3000 by default.

3. Access the application in your web browser at http://localhost:3000.

## License

This project is licensed under the MIT License.
