const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const route = require('./routes');
const { seedDB } = require('./app/utils/seed');
const MongoStore = require('connect-mongo');

dotenv.config();
const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessions({
	secret: "lagicungduoc",
	saveUninitialized: true,
	resave: false,
	store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
	cookie: { 
		maxAge: 1000 * 60 * 60 * 24,
		secure: true
	},
}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.engine('hbs', exphbs.engine({
	extname: 'hbs',
	defaultLayout: false,
	layoutsDir: __dirname + '/app/views/layouts/',
	partialsDir: __dirname + '/app/views/partials/',
	helpers: require('./helpers/handlebarsHelper'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views/pages'));


// routes
route(app);

const PORT = process.env.PORT || 6001;
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
		await seedDB();
	})
	.catch((error) => console.log(`${error} did not connect`));



