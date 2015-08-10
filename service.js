/**
 * service.js
 * Created by dcorns on 8/9/15.
 * A simple node restful web service that does some value conversions
 */
'use strict';

var http = require('http');

function convert(ct, cF, cT, cV){
  switch (ct){
    case 'numberbase':
      return convertnumbase(cF, cT, cV);
      break;
    default:
      return 'err';
    break;
  }
}

function convertnumbase(fromBase, toBase, value){
  //var functionName = fromNumBase + toNumBase,
  var result = '';
  if(value === '0') result = value;
  value = parseInt(value, fromBase);
  while(value >= toBase){
    result = value % toBase + result;
    value = Math.floor(value / toBase);
  }
  if(value > 0 && value < toBase) result = value + result;
  return result;
}

http.createServer(function(req, res){
  var cmd = req.url.split('/');
  var convertType = cmd[1], convertFrom = cmd[2], convertTo = cmd[3], convertValue = cmd[4];
  var result = convert ? convert(convertType, convertFrom, convertTo, convertValue) : 'err';
  if (result !== 'err'){
    res.end('' + result);
  }else{

  }
  res.writeHead(200, {'Content-Type': 'text/plain'});

}).listen(5000, '127.0.0.1');

console.log('Server up, localhost:5000');