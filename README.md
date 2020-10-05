# Published Nodes API APP

This repo contains a very simple node.js application that add APIs that allow you to manage the Azure IOT EDGE OPC UA Publisher modules by manipulating the publishedNodes.json file.
It creates a number of DMs that can be called from IoT Hub. These methids are (self-explanatory):  

- getEndpoint
- addEndpoint:Endpoint
- removeEndpoint:Endpoint
- removeAllEndpoint
- getOpcnodes
- addOpcnode:Opcnode
- removeOpcnode:Opcnode

Parameter format:  

- Endpoint: "opc.tcp://192.168.1.12:48000/lucaPLC"
- Opcnode:  {"Id": "ns=1;s=temperature", "OpcSamplingInterval": 2000, "OpcPublishingInterval": 5000, "DisplayName": "Temperature"}