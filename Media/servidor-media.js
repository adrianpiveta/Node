var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});

app.get('/', function (req, res) {
  fs.readFile('Media-post.html', function (erro,dado){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/media', urlencodedParser, function(req, res) {
  fs.readFile('media-res.html', function (erro, dado) {
    var valores = {
      'median': (Number(req.body.n1)+Number(req.body.n2)+Number(req.body.n3)+
            Number(req.body.n4))/4
    };
    for(var chave in valores){
      dado = ""+dado;
      dado = dado.replace("{{" + chave + "}}", valores[chave]);
    }
    res.writeHead(200, {'Content-type':'text/html'});
    res.write(dado);
    res.end();
  });
});
