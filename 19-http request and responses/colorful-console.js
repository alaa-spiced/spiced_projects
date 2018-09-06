const http = require("http");
const chalk = require("chalk");
const ca = require("chalk-animation");
const querystring = require("querystring");

const server = http.createServer((request, response) => {

    ca.karaoke(chalk.green("...request is in hand!"));

    request.on("error", err => {
        console.log(chalk.green("error in request: ", err));
    });
    response.on("error", err => {
        console.log(chalk.cyan("error in response: ", err));
    });

    // getting
    if (request.method == "GET") {
        response.end(`<!doctype html>
                    <html>
                    <title>Colors</title>
                    <form method="POST">
                      <input type="text" name="text">
                      <select name="color">
                        <option value="red">red</option>
                        <option value="blue">blue</option>
                        <option value="green">green</option>
                        <option value="yellow">yellow</option>
                        <option value="gray">gray</option>
                        <option value="magenta">magenta</option>
                        <option value="cyan">cyan</option>
                      </select>
                      <button type="submit">Go</button>
                    </form>
                    </html>`);
    }


    if (request.method == "POST") {
        ca.karaoke("POST POST POST POST POST");
        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            console.log("Request body :", body);

            const parsed = querystring.parse(body);
            const color = parsed.color;
            const text = parsed.text;
            console.log(chalk.keyword(color)(text));

            body = `
                    <!doctype html>
                    <html>
                        <title>${text}</title>
                        <a href="/" style="color:${color}">${text}</a>
                    </html>
                   `;
            response.end(body);
        });
    }
});

server.listen(8080, () => ca.karaoke(chalk.red("listening for requests on port 8080")));
