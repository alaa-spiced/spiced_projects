const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {

    request.on("error", err => {
        console.log("error in request: ", err);
    });
    response.on("error", err => {
        console.log("error in response: ", err);
    });

    // logging method, url and headers
    console.log("Request method: ", request.method);
    console.log("Request url :", request.url);
    console.log("Request headers :", request.headers);


    if (request.method == "HEAD") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        response.end();

    } else if (request.method == "GET") {

        response.statusCode = 200;


        //requests.txt as the url
        if (request.url == "/requests.txt") {
            // content-type
            response.setHeader("content-type", "text/plain");
            // creating a read stream from the file
            const readable = fs.createReadStream("requests.txt");
            // piping the readable to the response
            readable.on('open' , () => {
              readable.pipe(response);
            });
            readable.on("end", () => {
                readable.unpipe(response);
            });

        } else {
            response.setHeader("content-type", "text/html");

            let body = `
                        <!doctype html>
                        <html>
                            <title>Hello World!</title>
                            <p>Hello World!</p>
                        </html>
                        `;
            response.end(body);
        }
        //
    } else if (request.method == "POST") {
        let body = "";
        request.on("data", chunk => {
            body += chunk;
        });
        request.on("end", () => {
            console.log("Request body :", body);
            response.statusCode = 302;
            response.setHeader("Location", "/");
            response.end();
        });

    } else {
        response.statusCode = 405;
        response.end();
    }


    let data =
        Date() + "\t" + request.method + "\t" + request.url +"\t" + request.headers["user-agent"] + "\n";

    fs.appendFile("requests.txt", data, err => {
        if (err) console.log(err);
        console.log('logging info successfuly appended to requests.txt');
    });
});


server.listen(8080, () => console.log("listening for requests on port 8080"));
