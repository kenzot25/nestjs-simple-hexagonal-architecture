# NestJS Hexagonal Architecture with CQRS

A simple NestJS application demonstrating Hexagonal Architecture (Ports and Adapters) combined with CQRS (Command Query Responsibility Segregation) pattern.

## Overview

This project showcases how to structure a NestJS application using two powerful architectural patterns:

- **Hexagonal Architecture**: Separates business logic from external concerns through ports and adapters
- **CQRS**: Separates read and write operations for better scalability and maintainability

## What is Hexagonal Architecture?

Hexagonal Architecture, also known as Ports and Adapters, organizes code into distinct layers:

- **Domain Layer**: Contains business entities and value objects - the core business logic
- **Application Layer**: Contains use cases, commands, queries, and ports (interfaces)
- **Infrastructure Layer**: Contains adapters that implement ports (e.g., repositories, external services)
- **Presentation Layer**: Contains controllers and DTOs - the entry point for external requests

The key benefit is that your business logic remains independent of frameworks, databases, or external services. You can swap implementations without changing core business rules.

## What is CQRS?

CQRS (Command Query Responsibility Segregation) separates operations into two categories:

- **Commands**: Operations that change state (Create, Update, Delete)
- **Queries**: Operations that read data (Get, List)

In this project, NestJS CQRS module is used to handle commands and queries through dedicated handlers, making the code more organized and easier to maintain.

## Project Structure

```
src/user/
├── domain/                    # Domain Layer
│   ├── entities/             # Business entities (User)
│   └── value-objects/        # Value objects (Email, UserId)
│
├── application/              # Application Layer
│   ├── commands/            # Command objects (CreateUserCommand, etc.)
│   ├── queries/             # Query objects (GetUserQuery, etc.)
│   ├── handler/             # CQRS handlers (CommandHandler, QueryHandler)
│   ├── use-cases/           # Business use cases
│   └── ports/               # Ports/interfaces (UserRepositoryPort)
│
├── infrastructure/          # Infrastructure Layer
│   └── adapters/           # Adapters implementing ports (InMemoryUserRepository)
│
└── presentation/            # Presentation Layer
    ├── dtos/               # Data Transfer Objects
    └── user.controller.ts  # REST API controller
```

## How It Works

### Request Flow

1. **Controller** receives HTTP request and creates a Command or Query
2. **CommandBus/QueryBus** routes the Command/Query to the appropriate Handler
3. **Handler** delegates to the Use Case
4. **Use Case** contains business logic and uses Repository Port (interface)
5. **Repository Adapter** (in Infrastructure) implements the Port and handles data persistence

### Example: Creating a User

```
POST /users
  ↓
UserController.createUser()
  ↓
CreateUserCommand → CommandBus
  ↓
CreateUserHandler.execute()
  ↓
CreateUserUseCase.execute()
  ↓
UserRepositoryPort.save() (interface)
  ↓
InMemoryUserRepository.save() (implementation)
```

## Features

- User CRUD operations (Create, Read, Update, Delete, List)
- Hexagonal Architecture with clear layer separation
- CQRS pattern implementation
- Swagger API documentation
- In-memory repository (easily replaceable with database)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Running the Application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

The application will start on `http://localhost:9999`

### API Documentation

Once the application is running, access Swagger documentation at:
```
http://localhost:9999/api
```

## Available Endpoints

- `POST /users` - Create a new user
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Key Concepts

### Domain Layer

Contains pure business logic with no dependencies on external frameworks:

- **Entities**: Rich domain models with business rules (e.g., `User`)
- **Value Objects**: Immutable objects representing domain concepts (e.g., `Email`, `UserId`)

### Application Layer

Orchestrates use cases and defines contracts:

- **Use Cases**: Application-specific business logic
- **Ports**: Interfaces that define what the application needs (e.g., `UserRepositoryPort`)
- **Commands/Queries**: Data objects for CQRS operations
- **Handlers**: CQRS handlers that connect commands/queries to use cases

### Infrastructure Layer

Implements the ports defined in the application layer:

- **Adapters**: Concrete implementations of ports (e.g., `InMemoryUserRepository`)
- Can be easily swapped (e.g., replace in-memory with PostgreSQL, MongoDB, etc.)

### Presentation Layer

Handles external communication:

- **Controllers**: REST endpoints
- **DTOs**: Data transfer objects for request/response validation

## Benefits of This Architecture

1. **Testability**: Easy to test business logic in isolation
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Swap implementations without changing business logic
4. **Scalability**: CQRS allows independent scaling of read/write operations
5. **Independence**: Business logic is framework-agnostic

## Extending the Project

### Adding a Database

To replace the in-memory repository with a real database:

1. Create a new adapter in `infrastructure/adapters/` (e.g., `PostgresUserRepository`)
2. Implement the `UserRepositoryPort` interface
3. Update `user.module.ts` to use the new adapter

The rest of your code remains unchanged!

### Adding New Features

1. Create domain entities/value objects in `domain/`
2. Define use cases in `application/use-cases/`
3. Create commands/queries in `application/commands/` or `application/queries/`
4. Implement handlers in `application/handler/`
5. Add controller endpoints in `presentation/`

## Scripts

```bash
# Development
pnpm run start:dev

# Build
pnpm run build

# Production
pnpm run start:prod

# Linting
pnpm run lint

```

## License

MIT
