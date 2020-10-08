# Published Nodes API APP

This repo contains a very simple node.js application that add APIs that allow you to manage the Azure IOT EDGE OPC UA Publisher modules by manipulating the publishedNodes.json file.
It creates a number of DMs that can be called from IoT Hub. These methids are (self-explanatory):  

- getEndpoints
- addEndpoint:Endpoint
- removeEndpoint:EndpointUrl
- removeAllEndpoint
- getOpcNodes:EndpointUrl
- addOpcNode:EndpointUrl, OpcNode
- removeOpcNode:EndpointUrl, OpcNode

Parameter format:  
```
EndpointUrl: "opc.tcp://192.168.1.12:48000/lucaPLC"
Endpoint:  
{
    "EndpointUrl": "opc.tcp://myOpcUaServer:myPort/myResource",
    "UseSecurity": false,
    "OpcNodes": [
      {
        "Id": "ns=1;s=thisvar",
        "OpcSamplingInterval": 2000,
        "OpcPublishingInterval": 5000,
        "DisplayName": "This Var"
      }
    ]
}
OpcNode:  
{
    "Id": "ns=1;s=thisvar",
    "OpcSamplingInterval": 2000,
    "OpcPublishingInterval": 5000,
    "DisplayName": "This Var"
}
NodeId: "ns=1;s=thisvar"
```

TODO: 
1. Add API for User Security Management
2. Currently there is no way to add a new Endpoint directly, instead on should first add the EndpointUrl and subsequently the OpcNodes