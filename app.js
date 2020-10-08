'use strict';
const jf = require('jsonfile');
var published_nodes = [];
var newEndpoint = {};
var newTags = [];

var file = '/appdata/pn.json';
jf.readFile(file, function (err, pn) {
  if (err) console.error(err);
  else {
    published_nodes = pn;
    console.log(`currently with ${published_nodes.length} Endpoint configured`)
  }
});

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

const getEndpoints = (req, res) => {
  let Endpoints = [];
  for (var i = 0; i < published_nodes.length; i++) {
    Endpoint.push(published_nodes[i].EndpointUrl)
  }
  res.send(200, Endpoints);
}

const addEndpoint = (req, res) => {
  console.log(req.payload)
  res.send(200, published_nodes);
}

const removeEndpoint = (req, res) => {
  console.log(req.payload)
  res.send(200, published_nodes);
}

const removeAllEndpoint = (req, res) => {
  published_nodes = [];
  jf.writeFileAsync(file, published_nodes)
  res.send(200, published_nodes);
}

const getOpcnodes = (req, res) => {
  let endPoint = published_nodes.find(el => el.EndpointUrl === req.payload.EndpointUrl);
  res.send(200, endPoint.OpcNodes)
}

const addOpcnode = (req, res) => {
  let idx = published_nodes.findIndex(el => el.EndpointUrl === req.payload.EndpointUrl)
  let OpcNodes = published_nodes[index].OpcNodes;
  published_nodes.splice(index)
  OpcNodes.push(req.payload.OpcNode)
  jf.writeFileAsync(file, published_nodes)
  res.send(200, endPoint.OpcNodes)
}

const removeOpcnode = (req, res) => {
  let idx = published_nodes.findIndex(el => el.EndpointUrl === req.payload.EndpointUrl)
  if (idx == -1) {
    //return error 404
    res.send(404, 'EndpointUrl not found')
  } else {
    let pn = published_nodes[idx];
    console.log(pn)
    published_nodes.splice(idx);
    let opcnodes = pn.Opcnodes;
    console.log(opcnodes)
    let xdi = opcnodes.findIndex(el => el.Opcnode === req.payload.Opcnode);
    if (xdi == -1) {
      res.send(404, 'Opcnode not found')
    } else {
      opcnodes.splice(xdi);
      pn.Opcnodes = oppcnodes;
      jf.writeFileAsync(file, pn)
      res.send(200, 'Opcnode removed')
    }
  }
}

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        // Act on direct messages to the module.
        client.onMethod('getEndpoints', getEndpoints);
        client.onMethod('addEndpoint', addEndpoint);
        client.onMethod('removeEndpoint', removeEndpoint);
        client.onMethod('removeAllEndpoint', removeAllEndpoint);
        client.onMethod('getOpcnodes', getOpcnodes);
        client.onMethod('addOpcnode', addOpcnode);
        client.onMethod('removeOpcnode', removeOpcnode);
      }
    });
  }
});