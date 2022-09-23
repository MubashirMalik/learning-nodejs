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
3. Spreat & Rest operators
4. Destructing: arrays & objects
5. [Primitive vs Reference Types/Values](https://www.youtube.com/watch?v=9ooYYRLdg_g)
    - Primitive types are copied by value
    - `strings` are primitive types

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
    - For example: To parse an incoming request, we used,
      - `req.on('data', chunk => {...});` 
      - `req.on('end',  () => {...});`
    - We want to focus on our business  logic, not on the nitty-gritty details.  So, we use a framework for heavy lifting!
2. Alternatives 
	- Vanilla Node.js (what we have done so far),
	- Adonis.js (Laravel inspired)
	- Koa
	- Sails.js 
3. Middlewares
