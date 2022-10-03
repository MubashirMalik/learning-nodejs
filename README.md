# Notes

## 1. Introduction

1. The REPL
    - Read user input
    - Eval user input
    - Print user input (result)
    - Loop: Wait for new input

## 2. Optional JavaScript - A Quick Refresher

1. Use `let` & `const` instead of var as of next-gen JS
2. Arrow functions:
    - `const add = (a, b) => a + b`
    - `const add = a = > a + 1`
    - `const add = () => 1 + 2`
    - What are the advantages of using the arrow function syntax over the normal syntax?
    - `this` is the thing which calls the code, **binding this**
    - Arrow functions solve the above problem ([Explanation](https://www.youtube.com/watch?v=Pv9flm-80vM))
    - *Could not grasp concept completely: Revisit video-014*
3. Spread & Rest operators
4. Destructing: arrays & objects
5. [Primitive vs Reference Types/Values](https://www.youtube.com/watch?v=9ooYYRLdg_g)
    - Primitive types are copied by value
    - `strings` are primitive types
    - `let secondPerson = Object.assign({}, person)`

## 3. Understanding the Basics

1. Event loop
    - keeps on running as long as there are event listeners registered.
2. Single thread
    - NodeJS uses only one JavaScript thread.
    - How is it then able to handle multiple requests? Because it means it is eventually going to use the same thread for all requests?
    - Security question: Can you then access data from request A from request B?
    - Performance question: Does this not mean that if request A is still doing work, request B can't be handled?
     - *Could not grasp concept completely: Revisit video-036*


## 4. Improved Development Workflow and Debugging

1. Useful Commands
    - npm init
    - npm install nodemon --save-dev
    - npm install nodemon -g
    - "start": "node app.js"
    - "start-server": "node app.js"
    - npm start (start is special)
    - npm run start-server
    - "start": "nodemon app.js"

## 5. Express

1.  Why Express?
    - Server logic is complex!
    - For example: To parse an incoming request, we used:
      - `req.on('data', chunk => {...});` 
      - `req.on('end',  () => {...});`
    - We want to focus on our business  logic, not on the nitty-gritty details.  So, we use a framework for heavy lifting!
2. Alternatives 
    - Vanilla Node.js (what we have done so far),
	- Adonis.js (Laravel inspired)
	- Koa
	- Sails.js 
3. Middlewares
    - Functions that can hook into the funnel through which the request goes. 
    - `app.use()` has 5 different overloads. 
        - optional first argument: `path`
        - second argument: `callback`
        - `/` is the default path
    - Use `app.get(), app.post()` for exact matching

## 6. Working with Dynamic Content - Adding Templating Engines

1. Sharing data across requests & users
2. Template Engines
    - EJS
    - Pug (Jade)
    - Handlebars
3. `res.render('view-name', {dataPassed})` is provided by express to render a template 
4. `app.set('view engine', 'pug')` is used to register a view engine.
5. `app.set('views', 'views')` is used to tell express where our views are to be found. `views` is the default location.

## 7. The Model View Controller (MVC)

1. Separation of Concerns
    - Models
        - Represent data in the code
        - Work with your data (e.g. save, fetch)
    - Views
        - What the user sees
        - Decoupled from your application code
    - Controllers
        - Connecting your Models & your Views
        - Contains the "in-between" logic
        - Kind of split across middleware functions in a express like application.
    - Routes
        - define upon which path & which HTTP method which controller should execute.
        

## 9. Dynamic Routes - Advanced Models

1. Dynamic route & specific route ordering matters!
  
    - ```
        router.get('/products/:productId')
        router.get('/products/delete')
        ```
    - `/products/delete` will never fire because it will be handled by `/products/:productId`

    - We can extract it in controller, `const { productId } = req.params`
2. Optional query parameters can also be passed `?edit=true&b=2` and extracted through 
    - `const { edit, b } = req.query`

## 10. SQL Introduction

1. SQL
    - Strict/Strong **Data Schema**
    - **Data Relations**
        - 1-1
        - 1-M
        - M-N 
    - Data is distributed across multiple tables     
    - Horizontal scaling is difficult/impossible; Vertical scaling is possible
    - Limitations for lots of (thousands) read & write queries per second
2. NoSQL
    - No Data Schema
    - No (or very few) Relations
    - Data is typically merged/nested in few collections
    - Both horizontal and vertical scaling are possible 
    - Great performance for mass read & write requests
3. Horizontal Scaling
    - Add more servers (and merge data into one database)

4. Vertical Scaling
    - Improve server capacity/hardware, but there is a LIMIT!

## 11. Sequelize

1. An Object-Relational Mapping Library