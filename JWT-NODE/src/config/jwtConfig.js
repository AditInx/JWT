import crypto from 'node:crypto';

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

export default secretKey;