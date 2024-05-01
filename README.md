# Products Table Viewer

## Overview

UI interface to view and delete products via an API. The backend will feature a simple Node server with a /products endpoint to provide data, while the frontend will be a React app showcasing product listings with distinct column titles, search functionality, deletion in-memory, pagination with navigation controls, row selection with a highlight feature, and a select-all checkbox.

## Features

- **Simple Node server with a single endpoint /products.**
- **React app integrated with the Node server API.**
- **Displays products with standout column titles.**
- **Implements a search bar for product filtering.**
- **Allows in-memory deletion of rows.**
- **Incorporates pagination with navigation controls.**
- **Enables selection of rows with highlighted color.**
- **Includes a checkbox to select all visible rows.**
- **Displays a line indicating the number of selected rows.**

## Setup

### Prerequisites

- Node.js and npm installed on your machine.
- If running on a mac specify PORT other than 5000

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bhatkartik/Assignment.git

2. **cd back**
   
   ```bash
   npm install
   npm install --save-dev jest supertest

3. **cd ../front**
   ```bash
   npm install

4. **cd ../back**
   ```bash
   node app

5. **cd ../front**
   ```bash
   npm run start

6. **To Run Backend Test cases**
   ```bash
   npx jest

7. **To Run Frontend Test cases**
   ```bash
   npm test

## Technologies Used
### Backend:
Express.js<br>

### Frontend:
React<br>
