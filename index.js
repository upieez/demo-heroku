import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(PORT, () => {
	console.log(`~~App listening on ${PORT}~~`);
});
