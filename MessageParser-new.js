let EventEmitter = require("events").EventEmitter;

class MessageParser extends EventEmitter{
    constructor(socket){
        super();
        socket.setEncoding("utf8");
        
        let buffer = '';
        socket.on("data", (chunk) => {
            buffer = buffer + chunk;
            while(buffer.indexOf("\n") !== -1){
                let msg = buffer.substr(0, buffer.indexOf("\n"));
                buffer = buffer.substr(buffer.indexOf("\n") + 1);
                let response = JSON.parse(msg);
                this.emit(response.type, response.filename);
            }
        });
        socket.on("close", () => {
            this.emit("close");
        });
        socket.on("error", (err) => {
            this.emit("error", err);
        });
    }
}
module.exports = MessageParser;
