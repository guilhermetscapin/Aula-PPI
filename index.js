import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const server = express(); //oferecendo ao desenvolvedor um servidor HTTP de modo expresso.

//rechear o servidor com funcionalidades

server.get('/', (req, resp) => {
    resp.send(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reajuste de Salário</title>
            </head>
            <body>
                <h1>Olá, mundo!</h1>
            </body>
            </html>
        `);
});

server.get('/tabuada', (req, resp) => {
    console.log("Requisição tabuada");
});

server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});