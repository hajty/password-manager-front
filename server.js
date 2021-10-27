const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/dist/password-manager-front'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/password-manager-front/index.html'));
});

app.listen(process.env.PORT || 8080);
