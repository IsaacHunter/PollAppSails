# PollApp

This is a web app for creating survey questions and checking the resuults!

The framework used is Sails. An Express based framework. It uses MySQL.

Go to config/connections.js to change the configuration of mySQL connection. Change the parameters in 'someMysqlServer'.

After changing the configuration. You should run '''npm install''' to install all the dependencies that are in the package.json.

Once you are ready, you can start the server by navigating to the folder in the terminal and then run '''sails lift'''.

During starting the server you will get a prompt to choose the type of migration. The first time choose 3, so that you will use the seed data that I provide in the project. If you want to keep the data, choose 1.

a [Sails](http://sailsjs.org) application by Llorenç Muntaner
