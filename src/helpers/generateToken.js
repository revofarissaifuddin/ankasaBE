const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;
let refreshKey = process.env.JWT_REFRESH_TOKEN;

const generateToken = (payload) => {
    const verifyOpts = {
        expiresIn : "1d"
    };
    const token = jwt.sign(payload, key, verifyOpts);
    return token;
};

const refreshGenerateToken = (payload) => {
    const verifyOptsRefresh = {
        expiresIn: "1d"
    };
    const token = jwt.sign(payload, refreshKey, verifyOptsRefresh);
    return token;
};
module.exports = { generateToken, refreshGenerateToken };