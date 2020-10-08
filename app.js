'use strict';
const jf = require('jsonfile');
var published_nodes = [];
var Endpoints = [];

var file = '/appdata/pn.json';
jf.readFile(file, function (err, pn) {
  if (err) console.error(err);
  else {
    published_nodes = pn;
    for (var i = 0; i < published_nodes.length; i++) {
      Endpoints.push(published_nodes[i].EndpointUrl)
    }
    console.log(`currently with ${published_nodes.length} Endpoint configured`)
  }
});

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

const getEndpoints = (req, res) => {
  Endpoints = [];
  for (var i = 0; i < published_nodes.length; i++) {
    Endpoints.push(published_nodes[i].EndpointUrl)
  }
  res.send(200, Endpoints);
}

const addEndpoint = (req, res) => {
  console.log(req.payload.Endpoint)
  res.send(200, published_nodes);
}

const removeEndpoint = (req, res) => {
  console.log(req.payload.EndpointUrl)
  res.send(200, published_nodes);
}

const removeAllEndpoint = (req, res) => {
  published_nodes = [];
  jf.writeFileAsync(file, published_nodes)
  res.send(200, published_nodes);
}

const getOpcnodes = (req, res) => {
  let idx = published_nodes.findIndex(el => el.EndpointUrl === req.payload.EndpointUrl)
  if (idx > -1) {
    let endPoint = published_nodes[idx];
    res.send(200, endPoint.OpcNodes)
  } else {
    res.send(400, 'unknown EndpointUrl')
  }
}

const addOpcnode = (req, res) => {
  let idx = published_nodes.findIndex(el => el.EndpointUrl === req.payload.EndpointUrl)
  if (idx > -1) {
    let pn = published_nodes[idx];
    published_nodes.splice(idx)
    pn.OpcNodes.push(req.payload.Opcnode)
    published_nodes.push(pn)
    jf.writeFileSync(file, published_nodes)
    res.send(200, 'ok')
  } else {
    res.send(400, 'unknown EndpointUrl')
  }
}

const removeOpcnode = (req, res) => {
  if (!req.payload.hasOwnPropert('EndpointUrl') || !req.payload.hasOwnPropert('NodeId')) {
    res.send(400, 'missing parameter in API call')
  } else {
    let idx = published_nodes.findIndex(el => el.EndpointUrl === req.payload.EndpointUrl)
    if (idx == -1) {
      //return error 400
      res.send(400, 'EndpointUrl not found');
    } else {
      let pn = published_nodes[idx];
      published_nodes.splice(idx);
      let opcnodes = [];
      for (var i = 0; i < pn.Opcnodes.length; i++) {
        opcnodes.push(pn.Opcnodes[i].id)
      }
      console.log(opcnodes);
      
      let xdi = opcnodes.findIndex(el => el.id === req.payload.NodeId);
      if (xdi == -1) {
        res.send(404, 'Node Id not found')
      } else {
        published_nodes.splice(idx)
        opcnodes.splice(xdi);
        pn.Opcnodes = opcnodes;
        published_nodes.push(pn)
        jf.writeFileSync(file, published_nodes)
        res.send(200, 'ok')
      }
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