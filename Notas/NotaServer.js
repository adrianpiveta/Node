var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});

app.get('/', function (req, res) {
  fs.readFile('FormNotas.html', function (erro,dado){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/calcula', urlencodedParser,function (req, res){
  fs.readFile("ResNota.html", function (erro, dado) {
    var notas={
      'nota1': req.body.nota1,
      'nota2': req.body.nota2
    }
    var media=0;
    for(var chave in notas){
      media=media+notas[chave];
    }
    media/=notas.lengt;
    valores={
      'media': media
    }
    for (var chave in valores){
      dado = dado+"";
      dado = dado.replace("{{" + chave + "}}", valores[chave]);
    }
    for (var chave in notas){
      dado = dado+"";
      dado = dado.replace("{{" + chave + "}}", notas[chave]);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();

  });
});
