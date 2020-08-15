# How to start the project

#Requirements
- You should have Docker and Docker compose installed on your system.

# How to run the project?
- open your teminal in the root 
- type ```docker-compose up --build```, Docker will build the server, client and database images fdor you
- navigate to [http://localhost:3000](http://localhost:3000)
- You can click on Play/Resume to start the tracker, or Pause to pause or Reset to reset
- Once you submit your task, you will find it in the Table on the left
- You can filter using the end date, You can select today : to see the tasks ended today or select last week to see the tasks of the last 7 days and finally Last month to see the list of tasks in the last month
- You can search in the description, by clicking on the lookup icon and typing your text

# Environement variable
## Client
- ```REACT_APP_API_URL``` : Represents the url of the backend

## Server
- ```CORS_ORIGIN``` : To avoid security issues, we need to set the CORS ORIGIN
- ```DATABASE_URL```: DATABASE URL of Mongo DB
- ```NODE_ENV```: The Environment ('dev' or 'prod')
- ```PORT```: The port of the server

# Notes:
## What I liked about this project: 
- How to turn seconds into human readable time

## What would I do, if I had more time?
- Instead of force reloading when adding a new Task, maybe I would use Redux to update the table

## How long did it take me?
- Front about 4 hours: finding the right library and having a design that is friendly
- Backend: 2 hours
- Documentation and Docker setup: 1 Hour and half.



