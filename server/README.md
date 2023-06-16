# Structure
```
src
├── controllers
│   ├── hotelController.ts
│   ├── loginController.ts
├── middlewares
│   ├── authMiddleware.ts
├── models
│   ├── Hotel.ts
├── routers
│   ├── hotelRouter.ts
│   ├── loginRouter.ts
├── services
│   ├── hotelService.ts
├── app.ts
└── server.ts
```

### Let's go over these:

 - controllers: This is where you handle incoming HTTP requests and send responses.

- middlewares: Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

- models: This is where you'll define your data models. In this case, it's the Hotel model.

- routers: This is where you define your routes. You'll define endpoints here and map them to the correct controllers.

- services: These are used to abstract the logic of interacting with the database, or any other kind of logic that is not directly related to handling HTTP requests and responses.

- app.ts: This is where you'll set up your Express application, add middleware, and attach your routers.

- server.ts: This file is responsible for starting your Express application.
