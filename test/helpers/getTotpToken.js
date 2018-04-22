const OTPAuth = require('otpauth');
require('dotenv').config();

module.exports = function() {
    let totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromB32(process.env.GITHUB_TOTP_SECRET),
        hmacAlgorithm: 'sha1'
    });

    return totp.generate();
}

