const users = require('../database/customer');
const { checkCryptotoHash } = require('../../util/crypto');
const { 
    ACCESS_TOKEN_KEY, ACCESS_TOKEN_OPTIONS,
    REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTIONS
} = require('../../config');
const customers = require('../database/customer');
exports.getCustomer = function(req, res) {

    const { userId } = req.body;
    const customer = customers[userId];

    if(!customer){
        return res.json({
            code: 1,
            msg: 'customer dosen\'t found'
        });
    }
    return res.json({
        code: 0,
        msg: 'success',
        data: customer
    });
}
