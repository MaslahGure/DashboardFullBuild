const express = require('express')
const cors =require("cors");
//const bodyParser = require("body-parser");
const credentials = require("./middleware/credentials")
const corsOptions = require("./config/coreOptions")
const logger =require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const app = express();
const PORT =process.env.PORT || 3001;

//Log server events
app.use(logger);



// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// core allowed origins only 
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
//middleware for json
app.use(express.json());

//cookies middleware
app.use(cookieParser())

//app.use (bodyParser.urlencoded({extended: true}));



app.use('/api/register',require("./routes/register"));
app.use('/api/auth',require("./routes/auth"));
app.use('/api/logout',require("./routes/logout"));

app.use('/api/refresh',require("./routes/refresh"));// should be placed right before JWT verify 
app.use(verifyJWT)// placed before the routes to be protected 

app.use('/api/users',require("./routes/api/users"));
app.use('/api/convdata',require("./routes/api/convdata"));
app.use('/api/convstat',require("./routes/api/convstat"));
app.use('/api/profile',require("./routes/profile"));




// all routes undefined
app.all('*', (req, res) => {
   // res.status(404);  
    res.status(404).send("Server side running");
});
app.listen(PORT, () => console.log(`App running on port ${PORT}`));

