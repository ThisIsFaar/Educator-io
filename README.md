
# Educator.io


Every year through the government exams plenty of teachers are hired and posted in various government schools. The tracking of teachers from recruitment to their entire service duration is done manually which makes it difficult to manage and keep track. Addressing this problem will give government the ease of managing teachers through one single portal which will help in maintaining clear stats of the teachers currently posted. 

Digitizing Manual Record of Teachers with a Portal App.


Live Hosted At: [Heroku Link](https://educator-io.herokuapp.com/)


![img](https://i.postimg.cc/q7p5n1sY/login.png "SS")

![img](https://i.postimg.cc/76WsFDF8/mail.png "SS")

![img](https://i.postimg.cc/MGtrY1tG/OTP.png "SS")

![img](https://i.postimg.cc/j5533Ck4/records.png "SS")

![img](https://i.postimg.cc/PNG6qyfS/update-Req.png "SS")

![img](https://i.postimg.cc/QNBhHMx7/update-Request.png "SS")

![img](https://i.postimg.cc/sxG6yqzB/User-Dashboard.png "SS")

![img](https://i.postimg.cc/Vs31McdV/User-Profile.png "SS")


## Features/Tech Stack

- Single Page Application built over ReactJS
- NodeJS RunTime ENV.
- REST API with ExpressJS
- NoSql DataBase used (MongoDB)
- Digitizing Manual Record of Teachers with a Dashboard App. 
- Cross platform.
- Data Managed By Authority with 2FA (2 Factor Authentication). 
- UI Design/CSS Frameworks: PureCSS, CSS BEM Arch.
## Acknowledgements

To all these awesome NPM Packages:
- NodeMailer
- React-Toastify
- Lodash
- Express-Validator
- Nodemon
- Jsonwebtoken
- Formidable
- Dotenv
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET`  for JWT Token

`AUTH_EMAIL` Email To Used for Sending Rest Pass Links

`AUTH_PASS` Generate From Mail Account


`DB` MongoURI

`REACT_APP_BACKEND` API Link of Backend


## Installation

Install project with npm

```bash
  git clone https://github.com/ThisIsFaar/educator.io.git
  git checkout main
  cd educator.io
  npm install
  cd client
  npm install
```
Setup ENV. variables and run app with ```npm start``` on both dir root/frontend
## Authors

- [@ThisIsFaar](https://www.github.com/thisisfaar)
- [@Vipukr059](https://www.github.com/vipulkr059)
