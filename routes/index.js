import express from 'express';
import axios from 'axios';
import db from '../db/index.js';
import { getHash, checkAuth } from '../helper.js';

const router = express.Router();

router
	.route('/signup')
	.get((req, res) => {
		res.render('auth/signup');
	})
	.post((req, res) => {
		const query = 'INSERT INTO users (email, password) VALUES ($1, $2)';
		const { email, password } = req.body;
		const hashPassword = getHash(password);
		db.query(query, [email, hashPassword]).then(() => {
			res.redirect('login');
		});
	});

router
	.route('/login')
	.get((req, res) => {
		res.render('auth/login');
	})
	.post((req, res) => {
		const query = 'SELECT * FROM users WHERE email = $1';
		const { email, password } = req.body;
		const hashPassword = getHash(password);
		db.query(query, [email]).then((data) => {
			const user = data.rows[0];

			if (!user) {
				res.redirect('/login');
				return;
			}

			if (user.password === hashPassword) {
				const session = {
					userId: user.id,
					email: user.email,
					loggedInHash: getHash(email),
				};
				res.cookie('session', session);
				res.redirect('/');
			} else {
				res.redirect('/login');
			}
		});
	});

router.delete('/logout', (req, res) => {
	res.clearCookie('session');
	res.redirect('/');
});

router
	.route('/favorites')
	.get(checkAuth, (req, res) => {
		const query = 'SELECT * FROM images WHERE user_id = $1';
		const { session } = req.cookies;

		db.query(query, [session.userId]).then((data) => {
			const dogs = data.rows;
			res.render('favorites', { dogs });
		});
	})
	.post((req, res) => {
		const query = 'INSERT INTO images (user_id, image_url) VALUES ($1, $2)';
		const { session } = req.cookies;

		db.query(query, [session.userId, req.body.imageURL]).then(() => {
			res.json({ status: 'ok' });
		});
	});

router.get('/', checkAuth, (req, res) => {
	axios.get('https://dog.ceo/api/breeds/image/random').then((dogs) => {
		const imageURL = dogs.data.message;
		res.render('index', { imageURL });
	});
});

export default router;
