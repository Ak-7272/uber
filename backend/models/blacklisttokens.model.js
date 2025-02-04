const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 1 day expiration
    },
});

const BlacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistTokenModel;