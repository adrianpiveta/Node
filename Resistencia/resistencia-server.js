var fs = require('fs');
const http = require('http'); //let´s experimentar
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
const porta = 8080;
var servidor = app.listen(porta, function(){
  var portaUso= servidor.address().port;
  console.log("Executando na porta %s", portaUso);
  console.log("Planejado para executar na porta %s", porta);
});

app.get('/', function (req, res) {
  //vamos testar aspas duplas
  fs.readFile("resistor-form.html", function(erro, dado) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post("/resistor", urlencodedParser, function (req, res) {
  fs.readFile("resistor-res.html", function (erro, dado) {
    var valores = {
      'resistencia' : Number(req.body.tensao)/Number(req.body.corrente)
    };
    for (var chave in valores){
      dado = ""+dado;
      dado = dado.toString().replace("{{"+chave+"}}",
            valores[chave]);
    }
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(dado);
    res.end();
  });
});
