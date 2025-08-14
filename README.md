# Knowledge Base

## Introduction

The Knowledge Base project is a Node.js application built with TypeScript and Express. It provides a backend API for managing resources and topics, with authentication and role-based access control.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andreypedro/knowledge-base.git
   ```

2. Navigate to the project directory:

   ```bash
   cd knowledge-base
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

### Production Mode

To build and start the application in production mode:

```bash
npm run build
npm start
```

## Testing

To run the tests with coverage:

```bash
npm test
```

## Available Routes

### Authentication

- `POST /login`: Authenticate a user.

### Resources

- `GET /resources/:id`: Get a resource by ID.
- `DELETE /resources/:id`: Delete a resource by ID.
- `POST /resources`: Create a new resource.

### Topics

- `POST /topics`: Create a new topic.
- `PUT /topics/:id`: Update a topic by ID.
- `DELETE /topics/:id`: Delete a topic by ID.
- `GET /topics/shortest-path`: Get the shortest path between topics.
- `GET /topics/:id`: Get a topic by ID.
- `GET /topics/:id/tree`: Get the topic tree by ID.
- `GET /topics/:id/resources`: List resources associated with a topic.

## License

This project is licensed under the ISC License.
