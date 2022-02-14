const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    clientId: String,
    img: String,
    background: String,
    txt: String,
    interval: String,

});

const Message = mongoose.model('Ads', messageSchema);

module.exports = Message;




