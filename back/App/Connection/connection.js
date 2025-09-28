const mongoose = require('mongoose');
const url = require('../Url/url');

const connected = mongoose.connect(url.url).then(()=>{
    console.log('successfully connected....');  
}).catch((err)=>{
console.log(err);
})

module.exports = {connected};