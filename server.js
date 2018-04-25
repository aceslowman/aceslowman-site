const express = require('express');
const app = express();
const path = require('path');

app.enable('strict routing');

app.use(express.static('public', {redirect: false}));

app.use('/projects/weight_no_more',
  express.static('public/projects/weight_no_more/public'));

app.listen(3000);
