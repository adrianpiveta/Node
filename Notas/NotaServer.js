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
    var median= (Number(req.body.nota1) + Number(req.body.nota2))/2;
    var caminho=""
    if(median>=6 && median<=10)
      caminho="https://www.santacarmem.mt.leg.br/aprovado.png/image_preview"
    if(median<6 && median>=0)
      caminho="https://www.santacarmem.mt.leg.br/reprovado.jpg"
    valores={
      'media': median,
      'caminho': caminho
    }
    for (var chave in valores){
      dado = dado+"";
      dado = dado.replace("{{" + chave + "}}", valores[chave]);
    }
    setTimeout(function () {

    }, 10);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();

  });
});
