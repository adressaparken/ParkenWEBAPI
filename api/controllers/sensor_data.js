'use strict';

var mysql = require('mysql');
var configSettings = require('../../config/config');

// Exports all the functions to perform on the db
module.exports = {
    sensorData: sensorData,
    sensorDataList: sensorDataList,
    sensorDataByDate: sensorDataByDate
};

//Database connection creation from the database config file
var connection = mysql.createConnection({
    host: configSettings.mysql.host,
    user: configSettings.mysql.user,
    password: configSettings.mysql.password,
    database: configSettings.mysql.database
});
connection.connect();

function respond(res, query, params) {
    var sensorData = connection.query(query, params, function(err, result) {

        if (err) {
            res.status(400).send();
            throw err;
        } else
            console.log(sensorData.query);

        if (result) {
            res.json(result);
        } else {
            res.status(204).send();
        }
    });
}

//GET /sensorData/{id} operationId
function sensorData(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    respond(res, 'select id, id_wasp, sensor, value, timestamp from sensordata where id = ?', id);
}


//Get a list of results with a paginantion (limit and offset) format
function sensorDataList(req, res, next) {
    //Getting the API query request parameters
    var sensor = req.swagger.params.sensor.value;
    var limit = req.swagger.params.limit.value;
    var offset = req.swagger.params.offset.value;

    //In case of limit not specified it returns 400 (Client error)
    if (limit !== 'undefined' && limit > 1000) {
        res.status(400).send();
        throw err;
    }

    //Checking if the Sensor parameters esxists or not
    if (typeof sensor !== 'undefined') {
        respond(res, 'SELECT sensor, timestamp as date, value FROM sensordata where sensor = ? order by timestamp desc limit ? offset ? ;', [sensor, limit, offset]);
    } else {
        respond(res, 'SELECT sensor, timestamp as date, value FROM sensordata where sensor <> "BAT" and sensor <> "TIME" order by timestamp desc limit ? offset ? ;', [limit, offset]);
    }
}

//This API method returns results between to dates and groups them by an interval (YEAR,MONTH,WEEK,DAY,HOUR).
function sensorDataByDate(req, res, next) {
    //Getting the API query request parameters
    var sensor = req.swagger.params.sensor.value;
    var start_date = req.swagger.params.start_date.value;
    var end_date = req.swagger.params.end_date.value;
    var interval = req.swagger.params.interval.value;
    
    if (!["YEAR","MONTH","WEEK","DAY","HOUR"].includes(interval)) {
        res.status(400).send();
        throw err;
    }

    //Checking if the Sensor parameters esxists or not
    if (typeof sensor !== 'undefined') {
        //Checking if the interval was specified
        if (interval !== 'undefined') //TODO DAY, MONTH YEAR ETC
            respond(res, 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN ? and ?) AND sensor = ? group by +'+interval+'+(timestamp), sensor order by sensor desc;', [start_date, end_date, sensor, interval]);
        else
            respond(res, 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN ? and ?) AND sensor = ? order by timestamp desc;', [start_date, end_date, sensor]);

    } else {
        //Checking if the interval was specified
        if (interval !== 'undefined')
            respond(res, 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN ? and ?) AND sensor <> "BAT" and sensor <> "TIME" and sensor <> "ACC" and sensor <> "STR" group by '+interval+'(timestamp), sensor order by sensor desc;', [start_date, end_date, interval]);
        else
            respond(res, 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN ? and ?) AND sensor <> "BAT" and sensor <> "TIME" and sensor <> "ACC" and sensor <> "STR" order by timestamp desc;', [start_date, end_date]);
    }
}