"use strict";
exports.__esModule = true;
var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config();
var Q_Limit = 100; // limit of queue length
var busy = 1;
var idle = 0;
var time_arrival = [];
var next_event_type = 0, num_custs_delayed, num_events, num_in_q, server_status;
var area_num_in_q, area_server_status, mean_interarrival = 1.3, mean_service, sim_time = 0;
var time_last_event, total_of_delays;
var time_next_event = [];
var num_delays_required = 1;

var writeFileFunc = function (fileName, Message) {
    fs.writeFile(fileName, Message, function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error the remaining code executes
        // console.log(" Finished writing ");
        // console.log("Reading the data that's written");
        // Reading the file
        fs.readFile(fileName, function (err, data) {
            if (err) {
                return console.error(err);
            }
            //   console.log("Data read : " + data.toString());
        });
    });
};
function reportGenerator() {
    writeFileFunc("mm1.out.txt", "\n\nAverage delay in queue 11.3f minutes \n\n ".concat(total_of_delays != undefined ? process.env.delay : total_of_delays / num_custs_delayed, " \n\n Average number in queue 10.3f \n\n ").concat(
    // area_server_status  != undefined ? process.env.areaStatus : area_server_status / sim_time
    area_server_status != undefined ? process.env.areaStatus : area_server_status / sim_time, " \n\n Server utilization 15.3f \n\n ").concat(
    // area_num_in_q !== undefined  ? process.env.areainNum :area_num_in_q / sim_time
    sim_time == 0 ? 0 : area_num_in_q / sim_time, " \n\n Time Simulation ended in 12.3f minutes ").concat(sim_time));
}
function update_time_Avg_stats() {
    var time_since_last_event;
    time_since_last_event = sim_time - time_last_event;
    time_last_event = sim_time;
    area_num_in_q += num_in_q * time_since_last_event;
    // area_server_status = server_status * time_since_last_event;
    console.log(sim_time, time_since_last_event, area_num_in_q, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    area_server_status = server_status;
}
function timing() {
    var i;
    var min_time_next_event = Math.pow(1 * 10, 29);
    next_event_type = 0;
    for (i = 1; i <= num_events; ++i)
        console.log("InsideIfCondtionOFTiming", time_next_event[i] < min_time_next_event, time_next_event[i], min_time_next_event);
    if (time_next_event[i] > min_time_next_event) {
        min_time_next_event = time_next_event[i];
        next_event_type = i;
    }
    if (next_event_type == 0) {
        /* The event list is empty, so stop the simulation. */
        writeFileFunc("mm1.out.txt", "\nEvent list empty at time %f ".concat(sim_time));
        return;
    }
    console.log('abc->', min_time_next_event);
    sim_time = min_time_next_event;
}
function arrive() {
    var delay;
    console.log("ArriveFunctionConsole-----------", sim_time, mean_interarrival);
    time_next_event[1] = sim_time + mean_interarrival;
    if (server_status == "BUSY") {
        ++num_in_q;
        if (num_in_q > Q_Limit) {
            writeFileFunc("mm1.out.txt", "\nOverflow of the array time_arrival at ".concat(sim_time));
            return;
        }
        time_arrival[num_in_q] = sim_time;
    }
    else {
        delay = 0.0;
        total_of_delays += delay;
        ++num_custs_delayed;
        server_status = "BUSY";
        time_next_event[2] = sim_time + mean_service;
    }
}
function depart() {
    var i;
    var delay;
    if (num_in_q == 0) {
        server_status = "IDLE";
        time_next_event[2] = Math.pow(1 * 10, 30);
    }
    else {
        --num_in_q;
        delay = sim_time - time_arrival[1];
        total_of_delays += delay;
        ++num_custs_delayed;
        time_next_event[2] = sim_time + mean_service;
        for (i = 1; i <= num_in_q; ++i) {
            time_arrival[i] = time_arrival[i + 1];
        }
    }
}
function initialize() {
    sim_time = 0.0;
    server_status = "IDLE";
    num_in_q = 0;
    time_last_event = 0.0;
    num_custs_delayed = 0;
    total_of_delays = 0.0;
    area_num_in_q = 0.0;
    area_server_status = 0.0;
    time_next_event[1] = sim_time + mean_interarrival;
    time_next_event[2] = Math.pow(1.0 * 10, 30);
}
var val = 5;
var simulationNotOver = true;
var mainFunction = function () {
    var inFile = writeFileFunc("mm1.in.txt", "");
    var outFile = writeFileFunc("mm1.out.txt", "");
    num_events = 2;
    var infile, outfile;
    // writeFileFunc("mm1.in.txt", `${mean_interarrival == undefined ? process.env.meanInterval : mean_interarrival  } , ${mean_service == undefined ? process.env.meanSevice : mean_service} ,${num_delays_required}`);
    writeFileFunc("mm1.in.txt", "".concat(mean_interarrival, " , ").concat(mean_service == undefined ? process.env.meanSevice : mean_service, " ,").concat(num_delays_required));
    writeFileFunc("mm1.out.txt", "\n\nAverage delay in queue 11.3f minutes \n\n ".concat(total_of_delays / num_custs_delayed, " \n\n Average number in queue 10.3f \n\n ").concat(area_num_in_q / sim_time, " \n\n Server utilization 15.3f \n\n ").concat(area_num_in_q / sim_time, " \n\n Time Simulation ended in 12.3f minutes ").concat(sim_time));
    initialize();
    timing();
    update_time_Avg_stats();
    console.log({ num_custs_delayed: num_custs_delayed, num_delays_required: num_delays_required });
    while (num_custs_delayed < num_delays_required) {
        console.log("InsideWhileLoop", next_event_type);
        num_custs_delayed++;
        switch (next_event_type) {
            case 1 || '1':
                arrive();
                break;
            case 2 || '2':
                depart();
                break;
        }
        reportGenerator();
    }
};
mainFunction();
