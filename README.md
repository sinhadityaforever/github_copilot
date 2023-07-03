
# TrackiFi: A Finance Tracker Web Application

A web based application to keep track of personal finances. 


## Screenshots

![App Screenshot](https://snipboard.io/72LnSg.jpg)
![App Screenshot](https://snipboard.io/6eF1tI.jpg)
![App Screenshot](https://snipboard.io/q9ncHo.jpg)



## Running the app in development mode

1. Create two .env files, one in server, and other in client folder.


a) The server .env:

```bash
JWT_KEY: "Key for JWT token"
MONGO_URI: "Database URI"
PORT: "Port on which server should be running"
```

b) The client .env:

```bash
REACT_APP_API_URL= "URL of server (Eg: http://localhost:5000)"
```

2. Start the server by running "npm run dev" inside server folder.
3. Start the client by running "npm start" inside client folder.

## Live Website

The live website is hosted at:

https://trackifi.vercel.app/



## Tech Stack

Frontend: React, Redux, MaterialUI




## Features

- Adding/Editing/Deleting Transactions
- Adding/Editing monthly/category-wise budget
- Analysis of spending habits using useful graphs


