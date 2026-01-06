const bcrypt = require('bcryptjs');

async function testHash() {
    const password = 'password';
    const hash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUmGEJaq';

    const isValid = await bcrypt.compare(password, hash);
    console.log('Password "password" matches hash:', isValid);

    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(password, 12);
    console.log('New hash for "password":', newHash);

    const isValidNew = await bcrypt.compare(password, newHash);
    console.log('Password matches new hash:', isValidNew);
}

testHash().catch(console.error);