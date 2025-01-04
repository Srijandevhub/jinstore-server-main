const mongoose = require('mongoose');
const billingaddressSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    companyname: { type: String, default: "" },
    country: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    zipcode: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    phonecode: { type: String, default: "" },
    email: { type: String }
}, { timestamps: true })

const Billingaddress = mongoose.model('billingaddresses', billingaddressSchema);
module.exports = Billingaddress;