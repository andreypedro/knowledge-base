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

### Resources

### Topics

## Environment Setup

Before starting the project, copy the `.env.sample` file to `.env`:

```sh
cp .env.sample .env
```

## Mocked Users for Navigation

You can access the system using the following mocked users:

- **Admin:**
  - email: `admin@example.com`
  - password: `admin`
- **Editor:**
  - email: `editor@example.com`
  - password: `editor`
- **Viewer:**
  - email: `viewer@example.com`
  - password: `viewer`

## License

This project is licensed under the ISC License.
