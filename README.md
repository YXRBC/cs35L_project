# SEASWALK - Web app for rating CS and EE major classes
Over the past few years, students in CS and EE major have often complained about the bruinwalk, since they were unable to always get the information they needed efficiently for the incoming courses. Facing the same issue, our group proposed to offer a new app, Seaswalk, that is designed for evaluating courses in CS and EE departments.

# Steps to run the app on your computer

## Steps before cloning and installing
Make sure you have node.js installed in your computer. 
Make sure you have a MongoDB Atlas database ready for use

## Cloning repository and installing the app for use
Open the terminal/command line and navigate to the directory you wish to clone the repository to. Then type the following code in the command line:
```
git clone https://github.com/YXRBC/cs35L_project.git
```

After this, enter the following commands in order:
```
cd cs35L_project
npm install
```

Make sure you have installed the following packages:
 - MongoDB Atalas
 - Express
 - Node.js
 - Cookie-parse
 - Http-errors
 - Morgan
 - Express-session
If you don't have the packages installed, the code for installing the packages are:
```
npm install [package name]
```

Add a file *db.js* in the same directory as *server.js*
This file is code containing the username and password for connecting to the database, which is used in other files
The file should be the following format:
```
var url = [the connection string the MongoDB Atalas provides you for database connection]

module.exports ={url};
```

Now to run the app, in the main directory, enter the following code in the command line:
```
npm start
```
Open `localhost:3000` or `localhost:3000/login` from your favourite browser
