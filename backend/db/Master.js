const mongoose = require("mongoose");
const masterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
module.exports = mongoose.model("master", masterSchema);
