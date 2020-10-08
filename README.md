# Published Nodes API APP

This repo contains a very simple node.js application that add APIs that allow you to manage the Azure IOT EDGE OPC UA Publisher modules by manipulating the publishedNodes.json file.
It creates a number of DMs that can be called from IoT Hub. These methids are (self-explanatory):  

- getEndpoints
- addEndpoint:Endpoint
- removeEndpoint:Endpoint
- removeAllEndpoint
- getOpcnodes:EndpointUrl
- addOpcnode:Opcnode
- removeOpcnode:Opcnode

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
  Opcnode:  
  {
      "Id": "ns=1;s=thisvar", 
      "OpcSamplingInterval": 2000, 
      "OpcPublishingInterval": 5000, 
      "DisplayName": "This Var"}
  ```

  TODO: add API for User Security Management