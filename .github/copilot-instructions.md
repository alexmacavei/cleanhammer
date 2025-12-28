# Copilot Instructions for CleanHammer

## Project Overview

CleanHammer is a NestJS-based application that showcases a simplified Clean Architecture implementation using TypeScript. The project demonstrates domain-driven design principles with a clear separation of concerns between domain models, use cases, and infrastructure.

## Architecture

The codebase follows Clean Architecture principles with the following structure:

- **Domain Layer** (`src/domain/`): Contains pure business logic and domain models (e.g., Character, Item, Race)
- **Use Cases Layer** (`src/usecases/`): Contains application-specific business rules and use case implementations
- **Infrastructure Layer** (`src/infrastructure/`): Contains external implementations (database, schemas, repositories)
- **Controllers** (`src/*.controller.ts`): HTTP interface for the application

### Key Principles

- Domain models should remain pure and not depend on framework code
- Use cases define ports (interfaces) that infrastructure adapters implement
- Dependencies point inward: Infrastructure → Use Cases → Domain
- Business rules are enforced in the domain layer (e.g., Greenskins can only befriend other Greenskins)

## Code Style and Conventions

### TypeScript

- Use TypeScript 3.4.3
- Use single quotes for strings (enforced by Prettier and TSLint)
- Use 2 spaces for indentation
- Maximum line length: 150 characters
- Trailing commas in arrays and objects
- Leading underscores are allowed in variable names

### Formatting

- Run `npm run format` to auto-format code using Prettier
- Configuration in `.prettierrc`

### Linting

- Run `npm run lint` to check code quality
- Uses TSLint with `tslint:recommended` rules
- Configuration in `tslint.json`
- Arrow function parentheses are optional
- Object literal keys don't need to be sorted
- Interface names don't require an "I" prefix

## Development Commands

### Building

```bash
npm run build
```

### Running the Application

```bash
npm run start          # Basic start
npm run start:dev      # Watch mode with auto-reload
npm run start:debug    # Debug mode
npm run start:prod     # Production mode
```

### Testing

```bash
npm test               # Run unit tests
npm run test:watch     # Watch mode
npm run test:cov       # With coverage
npm run test:e2e       # End-to-end tests
npm run test:debug     # Debug mode
```

### Code Quality

```bash
npm run format         # Format code with Prettier
npm run lint           # Lint with TSLint
```

## Testing Conventions

- Unit test files should be named `*.spec.ts` and placed alongside the code they test
- E2E tests are in the `test/` directory with `*.e2e-spec.ts` naming
- Uses Jest as the testing framework
- Test configuration in `package.json` under the `jest` key

## Dependencies

### Core Technologies

- **NestJS 6.x**: Application framework
- **TypeScript 3.4.3**: Primary language
- **Mongoose 5.x**: MongoDB ODM (with @nestjs/mongoose integration)
- **RxJS 6.x**: Reactive programming library
- **Jest 23.x**: Testing framework

### Development Tools

- **TSLint**: Linting
- **Prettier**: Code formatting
- **Nodemon**: Development auto-restart
- **ts-node**: TypeScript execution
- **Concurrently**: Run multiple commands

## When Adding New Features

1. **Domain Models**: Add to `src/domain/` - keep them pure TypeScript with business logic only
2. **Use Cases**: Add to `src/usecases/` - define ports (interfaces) and orchestrate domain models
3. **Infrastructure**: Add to `src/infrastructure/` - implement database schemas and repository adapters
4. **Controllers**: Add controllers in `src/` to expose HTTP endpoints

## Domain-Specific Rules

- Greenskins can only befriend other Greenskins (enforced in `character.model.ts`)
- Characters have: race, name, items, friends, and gold
- Items have properties that can be sold for gold
- Use the `NotAcceptableException` from `@nestjs/common` for business rule violations

## Important Notes

- This is a demonstration project showcasing Clean Architecture patterns
- The focus is on architecture and separation of concerns, not on feature completeness
- When modifying code, maintain the clean separation between layers
- Respect the dependency rule: outer layers can depend on inner layers, but not vice versa
