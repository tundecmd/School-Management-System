const jwt = require('jsonwebtoken');
const Principal = require('../models/principalModel');


const authPrincipal = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const principal = await Principal.findOne({ _id: decoded._id, 'tokens.token' : token });
        if (!principal) {
            throw new Error()
        }
        req.principal = principal;
        req.token = token;
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate!!!'})
    }
}

module.exports = authPrincipal;