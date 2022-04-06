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
  fs.readFile('Post.html', function(erro, dado) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/cadastra',urlencodedParser, function (req, res) {
  fs.readFile('Calculo-apolice.html', function (erro, dado) {
    var valorApolice=req.body.valorVeiculo;
    if(req.body.anoFabricacao>=2010){
      valorApolice=0.0125*req.body.valorVeiculo;
    } else if (req.body.anoFabricacao>=2000 && req.body.anoFabricacao<=2009) {
      valorApolice=0.0175*req.body.valorVeiculo;
    } else if (req.body.valorVeiculo>=1980 && req.body.valorVeiculo<=1999) {
      valorApolice=0.02*req.body.valorVeiculo;
    } else {
      valorApolice=0.025*req.body.valorVeiculo;
    }
    if(req.body.sexo=="F")
      valorApolice*=0.9;
    else {
      valorApolice*=1.05;
    }
    if((new Date().getFullYear() - req.body.anoNascimento)<=30 || (new Date().getFullYear() - req.body.anoNascimento)>=60 )
      valorApolice*=1.2;
    valorApolice-=valorApolice*(req.body.pDesc/100);
    //
    var valores = {
      'valorApolice':  (Math.round(valorApolice).toFixed(2))
    };
    for (var chave in valores){
      dado =""+dado;
      dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});
