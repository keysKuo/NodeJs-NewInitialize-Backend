const app = require("./src/app");
const config = require("./src/configs/config.mongodb");

const PORT = config.app.port || 2405;

const server = app.listen(PORT, () => {
	console.log(`🚀 Server ready on port ${PORT}`);
});

// process.on("SIGINT", () => {
// 	server.close(() => {
// 		console.log(`Server stopped`);
// 	});
// });
