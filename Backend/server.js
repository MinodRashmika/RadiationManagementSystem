//run this command in your terminal for express to work
// MAKE SURE THE PATH IN YOUR TERMINAL IS IN THE "Backend" FOLDER BEFORE RUNNING THE COMMAND
/*cite : https://www.npmjs.com/package/otp-generator
https://www.w3schools.com/nodejs/nodejs_email.asp
cite login:  https://www.youtube.com/watch?v=-RCnNyD0L-s
cite jwt: https://www.youtube.com/watch?v=mbsmsi7l3r4
*/
/*cite : https://www.npmjs.com/package/otp-generator
https://www.w3schools.com/nodejs/nodejs_email.asp
cite login:  https://www.youtube.com/watch?v=-RCnNyD0L-s
cite jwt: https://www.youtube.com/watch?v=mbsmsi7l3r4
download this for test cases : npm install mocha
*/
//----> npm install --legacy-peer-deps

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';
import { MySQL_query, DatabaseSetup, getTable , SortBy ,
  searchTable , addToTable , loadCSV, deleteFromTable, 
  restorefromTable, editRowTable, addData, updateData,
   deleteData, licence_checker} from './MySQL_Functions.js';
import mysql from 'mysql2'
import readline from 'node:readline'
import promptSync from 'prompt-sync';
import bcrypt from 'bcrypt';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {
	initializePassport
} from './passport-config.js';
import otpGenerator from 'otp-generator';
import mailer from 'nodemailer';
//new file upload for docker
import multer from 'multer';		//References https://chatgpt.com/,  https://expressjs.com/en/resources/middleware/multer.html
import path from 'path';	
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prompt = promptSync();
//Express Set up
const app = express()
app.use(cors())
app.use(express.json());

//initialising session handling
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true 
}));



const port = process.env.PORT || 8070
//storing key value pair
const storeOTP = new Map();

//MySQL Database information
const MySQL = mysql.createConnection({
	host: "localhost",
	user: "g26",
	password: "student123", //<----------Make sure to change ", "password" and "database" if using local MySQL server
});
var databaseName = "capstone_2" // needs to be changed

initializePassport(
	passport,
	email => findUserByEmail(email),
	id => findUserById(id)

)

function findUserByEmail(email) {
	return new Promise((resolve, reject) => {
		MySQL.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => { //cite : https://chat.openai.com/
			if (error) {
				console.log("finduserbyemailid" + error);
				reject(error);
			} else {
				console.log("finduserbyemailid" + JSON.stringify(results[0]));
				resolve(results[0]);
			}
		});
	});
}

function findUserById(id) {
	return new Promise((resolve, reject) => {
		MySQL.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => { //cite : https://chat.openai.com/
			if (error) {
				reject(error);
			} else {
				resolve(results[0]);
			}
		});
	});
}

const transporter = mailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'radiationassetmanagementapplic@gmail.com',
		pass: 'mvef smcc wzvq lelf'
	}
});

function generateOTP() {
	return otpGenerator.generate(6, {
		digits: true,
		lowerCaseAlphabets: false,
		upperCaseAlphabets: false,
		specialChars: false
	});
}

function triggerOtpToUser(email) {
	if (!email) {
		return res.status(400).json({
			error: 'Missing email address'
		});
	}

	const otp = generateOTP();
	console.log("Your OTP :" + otp)

	const mailOptions = {
		from: 'radiationassetmanagementapplic@gmail.com',
		to: email,
		subject: 'Your OTP',
		text: `Your One-Time Password (OTP) is: ${otp}`
	};
	storeOTP.set(email, otp);
	console.log("Mail Options :" + JSON.stringify(mailOptions))
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
			return res.status(500).json({
				error: 'Error sending OTP'
			});
		}
		console.log('Email sent: ', info.response);
	});
}


app.set('view engine', 'ejs')
//this is creating a route such as a home page route where you need to logged into in order to access
app.use(express.urlencoded({
	extended: false
}))
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(cookieParser());

// main route used for user authentication
app.get('/', checkAuthenticated, (req, res) => {
	res.render('index.ejs', {
		name: req.user.name
	})
})
//for login in views folder, checks if user is not authenticated
app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs')
})

app.get('/otp', checkAuthenticated, (req, res) => {
	res.render('otp.ejs')
})


//for register in view folder
app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs')
})




app.post('/register', checkNotAuthenticated, async (req, res) => {
    const password = req.body.password;
	//password requirements
    if (password == null || password.length == 0) {
        return res.status(400).send("Please enter password");
    }
	//check for char pass length
    if (password.length < 5) {
        req.flash('error', 'Password must be 5 chars or more');
        return res.status(400).json({ ok: false, message: 'Password must be 5 chars or more' });
    }
	//checks if rso is already in databse or not, if it doesnt exist then it adds it
    const role = req.body.role;
    try {
        if (role === "Radiation Safety Officer role") {
            const [results] = await MySQL.promise().query('SELECT COUNT(*) AS count FROM users WHERE role = ?', [role]);

            if (results[0].count > 0) {
                return res.status(400).json({ ok: false, message: `${role} is already registered` });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const requestObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        };
        MySQL.query('INSERT INTO users SET ?', requestObj, (error, results, fields) => {
            if (error) {
                console.error('Issue with inserting data: ' + error.message);
                return res.status(500).json({ ok: false, message: 'Issue with inserting data' });
            }
            console.log('ID inserted in row:', results.insertId);
            res.status(200).json({ ok: true, message: 'User registered successfully' });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ ok: false, message: 'User registration failed' });
    }
});


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: info.message || 'Authentication failed' });
        }
        // Authentication successful, proceed to generate JWT token
        const token = jwt.sign({ name: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' }); //cite : https://chat.openai.com/
        res.cookie('token', token, { httpOnly: true });
        triggerOtpToUser(user.email);
        res.json({ token });
    })(req, res, next);
}); //added here

//error handling and redirects to logout
app.delete('/logout', (req, res, next) => {
	req.logOut(function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/login');
	});
})
app.post('/verify-otp', async (req, res) => {
	try {
		console.log("request body : " + JSON.stringify(req.body))
		let email = req.body.email;
		let requestOTP = req.body.otp;
		let getOTPFromCookie = storeOTP.get(email);
		console.log("email :" + email + ", requestOTP :" + requestOTP + ", getOTPFromCookie :" + getOTPFromCookie)
		if (requestOTP == getOTPFromCookie) {
			res.status(200).json({ ok: true, message: 'OTP verification successful' });
		} else {
			res.status(400).json({ ok: false, message: 'OTP verification failed' });
		}
	} catch {
		res.status(400).json({ ok: false, message: 'OTP verification failed' });
	}
})

//if user not autenticated it redirects to login
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

//if not authenticated it redirects to main page
function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}

function authenticateToken(req, res, next) {
    const token = extractToken(req); //cite : https://chat.openai.com
    if (!token) { return res.status(401).send("Token is not received");
    }
    jwt.verify(token,'your_secret_key_here', (err, user) => {
		//if there is an error
        if (err) {
            console.log("There is an error in token verfication", err);
            return res.status(403).send("Invalid token please validate");
        }
        req.user = user;
        next();
    });
}
app.get('/protected', authenticateToken, (req, res) => {
	res.json({
		message: 'Congratulations your route is secure'
	});
})

// connect to the MySQL database
MySQL.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
	MySQL.query("USE "+databaseName,(err,results,fields) =>{
		if(err)
			{
				DatabaseSetup(MySQL,databaseName,function(result){})
				console.log("\nUnknown database: "+databaseName+"\nCreating new database named \""+databaseName+"\"")
			}
	})
  }
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Based on the roles certain tables & actions can be viewed & perfomred
const rolePermissions = {
    "Radiation Safety Officer role": {
        allowedTables: ['rs','RS','rs_archive', 'rx', 'RX', 'rx_archive', 'lx', 'LX', 'lx_archive', 'ls', 'LS', 'ls_archive', 'rss', 'RSS', 'rss_archive', 'users' ],
        allowedActions: ['add', 'edit', 'get', 'search', 'delete', 'restore']
    },
    "Radiation Safety Supervisor role": {
        allowedTables: ['rs', 'rx'],
        allowedActions: ['get']
    },
    "Licensee role": {
        allowedTables: ['lx', 'ls'],
        allowedActions: ['get']
    },
    "Nobody User role": {
        allowedTables: [],
        allowedActions: []
    }
};

// function checks for permission grated to each role & will display messages if accessing other
function checkPermission(role, table, action) {
    console.log(`Checking permission for role: ${role}, table: ${table}, action: ${action}`);
    const permissions = rolePermissions[role];
    if (!permissions) {
        console.log(`Role ${role} not found in rolePermissions`);
        return "I'm sorry, I'm afraid I can't do that";
    }
    if (action && !permissions.allowedActions.includes(action)) {
        console.log(`Action ${action} not allowed for role ${role}`);
        return "Please contact the RSO for further information action";
    }
    if (!permissions.allowedTables.includes(table)) {
        console.log(`Table ${table} not allowed for role ${role}`);
        return "Please contact the RSO for further information table";
    }
    return "Permission granted";
}


app.get('/tokentest', (req, res) => {
	const requestToken = extractToken(req);
    console.log("extract Token:", requestToken);

    // Check if the Authorization header exists
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No authorization header found" });
    }
    
    // Split the Authorization header to get the token
    const authHeader = req.headers.authorization.split(' ');
    
    // Check if the token exists and if it's in the correct format
    if (authHeader.length !== 2 || authHeader[0] !== 'Bearer') {
        return res.status(401).json({ message: "Invalid authorization header format" });
    }

    // Extract the token
    const token = authHeader[1];
    
    // Print token to the console
    console.log("recieve Token:", token);
	console.log(getUserIdFromToken(token));
//	console.log(getUserRole(token));
	const userRole = getUserRole(token);
//	const fifthValue = userRole[4]; // Accessing the 5th element (index starts from 0)
	console.log('this is role',userRole, 'this is end');

	// Check permissions based on user role
	//const permissions = checkPermission(fifthValue, 'rx', 'delete'); // Replace 'table_name' and 'action_name' with actual table and action

    // Print permissions to the console
   // console.log("Permissions:", permissions);

    // Send a response
    res.status(200).json({ message: "Token received and printed to console" });
});


function getUserIdFromToken(token) {
    try { 
        const cod = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		console.log(cod);
      	return  cod.name;
    } catch (error) {
        // if the token doesnt exist with email
        console.error('No token with that emailID', error.message);
        return null;
    }
}


//Takes Command line user input for database setup
const rl = readline.createInterface({ //https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
	input: process.stdin,
	output: process.stdout,
});



//Middleware
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send("Welcome!") // Show "Welcome" text on user end
})

// Sets up SQL DATABASE and TABLES
app.post('/sqlsetup', async (req, res) => {
  let {PathName,TableName, SetupYN, LoadCSVYN} = req.body     
  SetupYN = SetupYN.toUpperCase()
  LoadCSVYN = LoadCSVYN.toUpperCase()
  console.log(SetupYN,LoadCSVYN)
	try {
		//const answer1 = prompt(`Would you like to setup new database? THIS WILL ERASE/REPLACE YOUR CURRENT DATABASE [Y/N]:`).toUpperCase(); //Database setup option

    //Database SETUP
		if (SetupYN == "Y") {
			DatabaseSetup(MySQL, databaseName, function(result) {}) //Sets up database
			console.log("Setup complete")
		} else if (SetupYN == "N") {
			MySQL_query(MySQL, "USE \`" + databaseName + "\`", function(result) {})
			console.log("No setup")
		} else {
			console.log("UNKNOWN COMMAND. Reload page to startover")
		}
    //CSV LOAD
    if (LoadCSVYN == "Y") {
      await new Promise((resolve, reject) => {
        loadCSV(MySQL, PathName, TableName, (err, result) => {
          resolve(result);
        });
      }); 
      res.status(200).json({
        message: "Data imported"
        }) 
    }else if (LoadCSVYN == "N") {
			res.status(200).json({
      message: "No data imported"
			})
		} else {
			res.status(404).json({
				message: "UNKNOWN COMMAND. Reload page to startover"
			})
		}
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})


//Loads CSV data into database table
app.get('/loadcsv', (req, res) => {
	try {
		const answer2 = prompt("Would you like to load data into a table?[Y/N]: ").toUpperCase()
		if (answer2 == "Y") {
			const path_csv = prompt("Enter csv file path: ")
			const TableName = prompt("Enter Table name: ")
			loadCSV(MySQL, path_csv, TableName, function(err, result) {});
			res.status(200).json({
				message: "Added Data to table"
			})
		} else if (answer2 == "N") {
			res.status(200).json({
				message: "No data imported"
			})
		} else {
			res.status(404).json({
				message: "UNKNOWN COMMAND. Reload page to startover"
			})
		}
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})

//frontend sql setup node function
app.post('/3000sql', (req,res) => {
  try {

    let {PathName, TableName, YesOrNo} = req.body;
    
    try {
      if(YesOrNo){
        DatabaseSetup(MySQL, databaseName, function(res){}) //Sets up database
        console.log("Setup Complete")
      } else {
        MySQL_query(MySQL,"USE \`"+databaseName+"\`",function(result){})
        console.log("No Setup")
      }
    } catch (e) {
      res.status(500).json({message: e})
    }

    
    loadCSV(MySQL, PathName, TableName, function(err,result){
    });

  } catch (error) {
    res.status(404).json({message:"UNKNOWN COMMAND. Reload page to startover"})
  }

})


app.get('/home', (req, res) => {
	res.send("You are in home") // Show "You are in home" text on user endconsole.log("user is in home")
})

app.get('/database', (req, res) => {
	res.status(200).json({
		message: "You are in search page"
	}) // Show "You are in search page" as a json format in browser
})

// GET request to fetch data from the 'rs' table
app.get('/database', (req, res) => {
	MySQL.query('SELECT * FROM rs', (error, results, fields) => {
		if (error) {
			console.error('Error querying the database:', error); // Log the specific database error
			res.status(500).json({
				error: 'Error querying the database',
				details: error.message
			}); // Send detailed error message in the response
			return;
		}
		res.status(200).json(results); // Send the fetched data as JSON response
	});
});


/*/Table view ==========================
app.get('/table/:TableName',async (req, res) => { //   example === http://localhost:8070/table/RX
	const TableName = req.params["TableName"];
    console.log(req.params["TableName"]);
	console.log(req.params["TableName"])
	var requestTokeToken(req);
	var userRole = await getUserRole(requestToken);
	var resMessage = checkPermission(userRole, TableName, 'get');
	if(resMessage && 'Permission granted' !== resMessage){
		return res.status(401).json({message: resMessage})
	}
  getTable(MySQL,TableName,function(result){  //Uses get_Data to get all data inside the specified table
    
    if (result.status == "404") {    //error checking
      res.status(404).json({message:"Invalid table"})
    }else
    {
      res.status(200).json(result)    //Sends table data to the user end as json and removes the "status" index from json
    }
    
  })
})*/

// formated with try catch & called check permission & getuserrole
app.get('/table/:TableName', async (req, res) => {
    const TableName = req.params["TableName"];
    console.log(req.params["TableName"]);

    try {
        const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, TableName, 'get');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
        getTable(MySQL, TableName, function(result){ //Uses get_Data to get all data inside the specified table
			console.log(result);
            if (result.status === "404") {
                res.status(404).json({ message: "Invalid table" }); //error checking
            } else {
                res.status(200).json(result); //Sends table data to the user end as json and removes the "status" index from json
            }
        });
    } catch (error) {
        console.log('Error processing request for table:', TableName, error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


	
	function getUserRole(token) {
		return new Promise((resolve, reject) => { //cite : https://chat.openai.com/
			if (!token) {
				reject("there is no token");
				return;
			}
			try {
				const cod = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
				findUserByEmail(cod.name)  
					.then(user => {
						if (!user) {
							reject('User not found');
						} else { //cite : https://chat.openai.com/
							let normalizedRole = user.role.trim(); // Trim any extra spaces
                        	console.log("Normalized role:", normalizedRole); // Debug: Log the normalized role
                        	resolve(normalizedRole);
						}
					})
					.catch(error => {
						console.error('there is an error', error);
						reject(error);
					});
			} catch (error) {
				console.error('couldnt verify token', error);
				reject('err occured');
			}
		});
	}
	



function extractToken(req) {
	console.log("Data received:", req.headers); // Log the data being received

    const authHeader = req.headers['authorization'];
    if (!authHeader) { //if no auth header
        console.log("auth not found");
        return null;
    }
    //cite : https://chat.openai.com/
    var parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log("Authorization header is not formatted as 'Bearer <token>'");
        return null;
    }
    //token used
    var tkn = parts[1];
    return tkn;
}






//Table sort
app.get('/table/:TableName/sort/:ColumnName', (req, res) => { // example === http://localhost:8070/table/RX/sort/Make
	try {
		SortBy(MySQL, req.params["TableName"], req.params["ColumnName"], function(result) {
			res.status(200).json(result)
		})
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})


app.get('/search',async (req, res) => {
	
  try {
	const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'search');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
    let {
      TableName,
      Data
    } = req.body
    console.log(req.body)

		searchTable(MySQL, TableName, Data, function(result) {
			if (result.status == "404") {    //error checking
        res.status(404).json({message:"Cannot find Data"})
      }else
      {
        res.status(200).json(result)    //Sends table data to the user end as json and removes the "status" index from json
      }
		})
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})



app.post('/add',async (req, res) => {
	try {
		const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'add');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
	let {
		TableName,
		Data
	} = req.body
		addToTable(MySQL, TableName, Data, function(result) {
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to add data: "+Data+" to :"+TableName})
      }else {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
	})
} catch (error) {
	return res.status(500).json({ message: error.message });
}
})


app.post('/addData',async (req ,res) =>{          //For tables that are not rx,rs,ls,lx
  let {TableName,Data} = req.body
  try
  {
	  const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'add');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
    await addData(MySQL,TableName,Data,function(result){
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to add data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    })
  }
  catch(error)
  {
    res.status(404).json({message:error}) 
  }
})

app.delete('/delete',async(req ,res) =>{
	console.log("Data received:", req.body); // Log the data being received

	try {
        const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'delete');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
	let {TableName, Data} = req.body
    deleteFromTable(MySQL,TableName,Data,function(result){
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to delete data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    }) 
  }
  catch(error)
  {
    res.status(500).json({message:error}) 
  }
})

app.delete('/deleteData', async (req ,res) =>{        //For tables that are not rx,rs,ls,lx
  try
  {
	const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'delete');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
    let {TableName,Data} = req.body
    var ArchiveTable = TableName+ "_archive"
    console.log("Data received:", req.body); // Log the data being received

    console.log(req.body)
    await deleteData(MySQL,Data,TableName,ArchiveTable,function(result){
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to delete data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    })
  }
  catch(error)
  {
    res.status(500).json({message:error}) 
  }
})

app.delete('/restore', async (req, res) => {
	try {
        const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'restore');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
	let {
		TableName,
		Data
	} = req.body
	console.log(req.body)
		restorefromTable(MySQL, TableName, Data, function(result) {
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to restore data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    })
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})

app.delete('/restoreData', async (req ,res) =>{        //For tables that are not rx,rs,ls,lx
  try
  {
    let {TableName,Data} = req.body
    var ArchiveTable = TableName+ "_archive"
    console.log("Data received:", req.body); // Log the data being received

    await deleteData(MySQL,Data,ArchiveTable,TableName,function(result){
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to restore data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    })
  }
  catch(error)
  {
    res.status(404).json({message:error}) 
  }
})

app.put('/edit',async (req, res) => {
	try {
		const requestToken = extractToken(req);
	if (!requestToken) {
		return res.status(401).json({ message: "There is no token" });
	}
	const userRole = await getUserRole(requestToken);
	const addResMessage = checkPermission(userRole, req.body.TableName, 'edit');
	if (addResMessage && addResMessage !== 'Permission granted') {
		return res.status(401).json({ message: addResMessage });
	}
	let {
		TableName,
		Data,
		NewData
	} = req.body
		editRowTable(MySQL, TableName, Data, NewData, function(result) {
      if (result.status == "404") {    //error checking
        res.status(404).json({message:"Unable to edit data: "+Data+" to :"+TableName})
      }else
      {
        res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
      }
    })
	} catch (error) {
		res.status(404).json({
			message: error
		})
	}
})

app.put('/editData', async (req ,res) =>{

	let {TableName,Data,NewData} = req.body
	try
	{
		const requestToken = extractToken(req);
		if (!requestToken) {
			return res.status(401).json({ message: "There is no token" });
		}
		const userRole = await getUserRole(requestToken);
		const addResMessage = checkPermission(userRole, req.body.TableName, 'edit');
		if (addResMessage && addResMessage !== 'Permission granted') {
			return res.status(401).json({ message: addResMessage });
		}
		await updateData(MySQL,TableName,Data,NewData, function(result) {
		if (result.status == "404") {    //error checking
			res.status(404).json({message:"Unable to edit data: "+Data+" to :"+TableName})
		}else
		{
			console.log('Data updated successfully:', req.body); // Log the updated data

			res.status(200).json(req.body)    //Sends table data to the user end as json and removes the "status" index from json
		}
		})
  }
  catch(error)
  {
	console.error('Error updating data catch:', error); // Log the error
    res.status(404).json({message:error}) 
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

const storage = multer.diskStorage({   //References https://chatgpt.com/
    destination: function (req, file, cb) {
        cb(null, './uploads/');			//Stores the uploaded file in the "/upload" folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);	//Keeps the original files name
    }
});
  
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});
// File upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {	//References https://chatgpt.com/,  https://expressjs.com/en/resources/middleware/multer.html
    console.log('Upload request received');

    // Check if both file and tablename are provided
    if (!req.file || !req.body.tablename) {
        console.log('Missing file or tablename');
        return res.status(400).send('Missing file or tablename.');
    }

    const absoluteFilePath = path.join(__dirname, 'uploads', req.file.filename);
    console.log('Absolute file path:', absoluteFilePath);

    // Assuming TableName and callback are defined somewhere
    await loadCSV(MySQL, absoluteFilePath, req.body.tablename.toLowerCase(), function (result) {});

    // Delete the file after loading
    fs.unlink(absoluteFilePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });

    res.send('File uploaded successfully.');
});


  

//=============================================== Checks for LS and LX that are about to expire ===============================================
var hours = 24         // CHANGEABLE
var minutes = 0       // CHANGEABLE
var seconds = 0      // CHANGEABLE

var totalTime = hours*60*60 + minutes*60 + seconds  //Coverts to seconds
var millisecond = totalTime * 1000                  //Converts to milliseconds

console.log("Licence check time interval (milliseconds): "+millisecond)
try{
  setInterval(() => {licence_checker(MySQL, "ls",3,transporter);}, millisecond);    
  setInterval(() => {licence_checker(MySQL, "ls",1,transporter);}, millisecond);

  setInterval(() => {licence_checker(MySQL, "lx",3,transporter);}, millisecond);
  setInterval(() => {licence_checker(MySQL, "lx",1,transporter);}, millisecond);
}
catch
{
  console.log("Unable to perform licence expiry check");
}


//export default app
