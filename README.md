# README #

Parken API

### What is this repository for? ###

This API makes available data stored from multiple sensors (humidity, temperature, CO2, etc...) installed in a Park.

### How do I get set up? ###


1. Clone the repo - git clone https://github.com/adressaparken/ParkenWEBAPI.git

2. Install application packages - npm install

3. Install swagger - npm install -g swagger

4. Start Project - swagger project start OR node app.js

For more details about how swagger and node js restful api have a look at [This link](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger "RESTful API development in Node.js with Swagger")

* Database configuration

In order to run the API a database config.js file needs to be created with the content bellow:
```
'use strict;'
var settings = {
    port: '10010'
};

settings.mysql = {
    host: 'xxx.xxx.x.x',
    user: 'xxxxxx',
    password: 'xxxxx',
    database: 'xxxxxx'
};

module.exports = settings;
```

### Who do I talk to? ###

* Repo owner or admin
Adressaparken, contact adressaparken@ntnu.no

### Licence ###

The MIT License (MIT)

Copyright (c) 2017 Adressaparken

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
