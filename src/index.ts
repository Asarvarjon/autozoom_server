import http from 'http';
import App from "./server";
import router from "./router";  

const ExpressApp = new App(router)

const server = http.createServer(ExpressApp.getServer);

// _________LISTEN PORT___________
const port = 8546  


server.listen(port, () => console.log("Listening port on " + port)) 
