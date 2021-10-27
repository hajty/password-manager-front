# Password Manager

## About
Password Manager front-end application which allows users to create account and store their passwords. Application communicates with the [back-end API](https://github.com/hajty/password-manager-back), sending and receiving GET, POST, PATCH and DELETE REST JSON requests. 

User's password is hashed with Argon2 hashing function and securely stored in MongoDB database. Stored passwords informations like service name, login and password are encrypted by AES with the automatically generated key at the first user log in, which later user keeps on his own disk or any other data storage device. After next log in, user has to provide key file needed to decipher stored passwords. When the user's password or key file are gone, they cannot be restored.

## Usage

***DEMO application hosted on Heroku [here](https://hajtys-password-manager.herokuapp.com)*** (it may take few seconds to launch and then first request to api, because Heroku shutdowns applications after 30 minutes of inactivity).

E-mail address of course does not need to be valid, there are no registration links etc.

## How to get work with this project

This application has been made to communicate with my own back-end API application which you can find [here](https://github.com/hajty/password-manager-back).

### Installation
Simply `git clone` the project and run `npm install`.\
You will also need Angular CLI `npm install -g @angular/cli`.\
You can run the project using `ng serve` which will launch the server and rebuild the app everytime you make any changes.
  
## Used technologies
- Angular
- TypeScript
- Bootstrap
- HTML, CSS
