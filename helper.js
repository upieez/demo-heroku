import jsSHA from 'jssha';

export const getHash = (input) => {
	const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
	const unhashedString = `${input}-${process.env.SALT}`;
	shaObj.update(unhashedString);
	return shaObj.getHash('HEX');
};

export const checkAuth = (req, res, next) => {
	const { session } = req.cookies;

	if (!session) {
		res.redirect('/login');
		return;
	}

	const { email, loggedInHash } = session;

	if (loggedInHash !== getHash(email)) {
		res.redirect('/login');
		return;
	}

	next();
};
