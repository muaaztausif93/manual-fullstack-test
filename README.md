# OpenHouse app backend
    Its a back-end server of OpenHouse app. follow the instructions to run the server

# Prerequisites
    - node v16.10.0
    - postgres (you can configure the database & schema name in .env.dev just make sure both exist in your system)

# Running using docker (preferred)
    running docker dev
    `npm i`
    `npm run start:docker:dev`

# Formatting the project
    format project
        `npm run format`

# migration make command
    npm run migration:make -- filename-that-you-want

# docker logs of your container in terminal
    1- get container ID
        docker ps
    then: docker logs --follow <containerID>



# Task Details

# creating Admin
    - first create admin if you don't have by going into routes folder
    - /api/auth/signUp
    - type: admin
    - it will return accessToken and idToken which you need to pass from frontend
    - format:
        - authorization: 'Bearer accessToken'
        - idToken: idToken

# simple user
    - type: user
    - for simple user there will be type of user by default and rest is same.

# basic routes flow
    - Auth
    - signUp
    - SignIn

    - Property
    - create Property (to create property)
    - get Property (to get specific property)
    - getPropertyDetailsById (to get property detail with open house user enrollments with this property)

    - Enrollment
    - enroll (to enroll user)
    - unenroll (to unenroll user)


## Run frontend through (PROJECT)/frontend
