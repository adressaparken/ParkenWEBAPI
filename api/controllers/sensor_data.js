'use strict';

var mysql = require('mysql');
var configSettings = require('../../config/config');

// Exports all the functions to perform on the db
module.exports = {
    sensorData: sensorData,
    sensorDataList: sensorDataList,
    sensorDataByDate: sensorDataByDate
};

var connection = mysql.createConnection({
    host: configSettings.mysql.host,
    user: configSettings.mysql.user,
    password: configSettings.mysql.password,
    database: configSettings.mysql.database
});
connection.connect();


//GET /sensorData/{id} operationId
function sensorData(req, res, next) {

    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var sensorData = connection.query('select id, id_wasp, sensor, value, timestamp from sensordata where id = ?', id, function(err, result) {

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

function sensorDataList(req, res, next) {

    var query = '';
    var sensor = req.swagger.params.sensor.value;
    var limit = req.swagger.params.limit.value;
    var offset = req.swagger.params.offset.value;

    if (limit !== 'undefined' && limit > 1000) {
        res.status(400).send();
        throw err;
    }

    if (typeof sensor !== 'undefined') {
        query = 'SELECT sensor, timestamp as date, value FROM sensordata where sensor = "' + sensor + '" order by timestamp desc limit ' + limit + ' offset ' + offset + ';';
    } else {
        query = 'SELECT sensor, timestamp as date, value FROM sensordata where sensor <> "BAT" and sensor <> "TIME" order by timestamp desc limit ' + limit + ' offset ' + offset + ';';
    }

    var sensorData = connection.query(query, function(err, result) {

        if (err) {
            res.status(400).send();
            throw err;
        }

        if (result) {
            res.json(result);
        } else {
            res.status(204).send();
        }
    });

    if (sensorData)
        console.log(sensorData.sql);
}

function sensorDataByDate(req, res, next) {

    var query = '';
    var sensor = req.swagger.params.sensor.value;
    var start_date = req.swagger.params.start_date.value;
    var end_date = req.swagger.params.end_date.value;
    var interval = req.swagger.params.interval.value;

    if (typeof sensor !== 'undefined') {
        if (interval !== 'undefined')
            query = 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN "' + start_date + '" and "' + end_date + '") AND sensor = "' + sensor + '" group by ' + interval + '(timestamp), sensor order by sensor desc;';
        else
            query = 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN "' + start_date + '" and "' + end_date + '") AND sensor = "' + sensor + '" order by timestamp desc;';
    } else {
        if (interval !== 'undefined')
            query = 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN "' + start_date + '" and "' + end_date + '") AND sensor <> "BAT" and sensor <> "TIME" and sensor <> "ACC" and sensor <> "STR" group by ' + interval + '(timestamp), sensor order by sensor desc;';
        else
            query = 'SELECT sensor, date(timestamp) as date, value FROM sensordata where (timestamp BETWEEN "' + start_date + '" and "' + end_date + '") AND sensor <> "BAT" and sensor <> "TIME" and sensor <> "ACC" and sensor <> "STR" order by timestamp desc;';
    }

    var sensorData = connection.query(query, function(err, result) {

        if (err) {
            res.status(400).send();
            throw err;
        }

        if (result) {
            res.json(result);
        } else {
            res.status(204).send();
        }
    });

    if (sensorData)
        console.log(sensorData.sql);
}