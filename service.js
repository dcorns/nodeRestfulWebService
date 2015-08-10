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

function convertnumbase(fromNumBase, toNumBase, value){
  var functionName = fromNumBase + toNumBase, result = 'err';
  var numBaseConvert = {
    //fix this converted to work when time permits
    decbin: function(v){
      var result = '';
      if(value === '0') result = value;
      while(value >= 2){
        result = value % 2 + result;
        value = Math.floor(value / 2);
      }
      if(value == 1) result = 1 + result;
      return result;
    },
    bindec: function(v){
      var x = 0, result = 0;
      v = v.split('');
      v.forEach(function(cv, idx, ary){
        result = x * 2 + parseInt(cv);
        x = result;
      });
      return result;
    }
  };
  if(numBaseConvert[functionName]){
    result = numBaseConvert[functionName](value);
  }
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