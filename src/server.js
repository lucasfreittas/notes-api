const { response } = require('express');
const express = require('express');

const app = express();

app.get('/message', (request, response) => {
    const { id, user } = request.query;

    response.send(`Seu Id é: ${id} e seu nome é ${user}`);
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));