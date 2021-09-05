const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type:String
    },
    date:{
        type: 'string',
        default: Date.now()
    }
})

module.exports = mongoose.model('event',eventSchema)