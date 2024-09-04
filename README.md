# Backend Express Template

### Folder Structure

```
├── README.md
├── nodemon.json
├── package-lock.json
├── package.json
├── prisma
│   └── schema.prisma
├── src
│   ├── api
│   │   ├── controllers
│   │   │   └── user.controller.ts
│   │   ├── middleware
│   │   │   └── error.middleware.ts
│   │   └── routes
│   │       ├── index.ts
│   │       └── user.route.ts
│   ├── app.ts
│   ├── db
│   │   └── config.ts
│   ├── domain
│   │   └── user.business.ts
│   ├── index.ts
│   ├── logger.ts
│   ├── repository
│   │   ├── interfaces
│   │   │   ├── UserRepository.ts
│   │   │   └── index.ts
│   │   └── user.repository.ts
│   └── server.ts
└── tsconfig.json
```

**prisma/schema.prisma**

- define db models
- ensure you have "DATABASE_URL" defined in your .env
- update the db with new models with
  ```
  $ npx prisma db push
  ```

**src/api/**

- **controllers**
  - handles incoming requests and directs them to the appropriate service or business logic.
- **middleware**
  - contains functions that run between requests and responses, like error handling or authentication.
- **routes**
  - defines the API endpoints and their respective controllers.

**src/db/**

- contains db config and connection setup

**src/domain/**

- contains the business logic of the application, often involving core functionality that isn't tied to external systems.

**src/repository/**

- manages data access, for abstracting database operations
- **/interfaces/**
  defines interfaces for repositories, helping with type safety and decoupling implementation details

## Things to note

### Naming

- Entity-Based Naming: files are based on the entity they handle eg "user" and the role they play (controller, business, repository, route). This is done to maintain clarity and ease of use at glance and to organize the code logically according to function. **Keep following this structure**

## Steps to create your own

- Again, keep related entities together in a single file. For example, if you wanted to create API routes and handlers for your Todos, you would:
  1. Define the model in the schema.prisma file and promptly push to the DB
  2. Create a TodoRepository in **/src/interfaces**, here define the method signatures (params and return types) that will typically be for your CRUD applications. _I suggest doing them one a time as you work on them, eg, getTodos(): Promise<Todo> | null_
     NB: Prisma autogenerates types during migration creation so you can easily obtain that Todo type to use across the app.
  3. Code the access method to get the todos in **/src/repository**. You would have made a **todo.repository.ts** file to do this in. Simply make the request to Prisma and return the data.
  4. Create a **todo.business.ts** and define another method that will call the TodoRepository function. Note that a parameter of the actual repository is the norm. We use the \_entityRepository format for it.
  5. Prepare your **todo.controller.ts** and handle all appropriate and potential errors and edge cases, before (and after) grabbing the response for the todo.business
  6. Make you **todo.route.ts** and define and export the Router _(and consume it in **src/api/routes/index.ts**)_. Make the associated request type (in this case a get request for all the todos) and wrap your controller method in the _asyncHandler_.
  7. Test on Postman and repeat for all your operations.
