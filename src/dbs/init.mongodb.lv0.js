const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const connectString = `mongodb://localhost:27017/serverInit`;
mongoose
	.connect(connectString)
	.then(() => {
		console.log(`Connected Mongodb`);
        countConnect();
	})
	.catch((err) => {
		console.log(`Error: ${err}`);
	});

// dev

if (1 === 1) {
	mongoose.set("debug", true);
	mongoose.set("debug", { color: true });
}

module.exports = mongoose;
