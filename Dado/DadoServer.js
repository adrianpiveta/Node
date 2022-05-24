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
  fs.readFile('DadoPag.html', function (erro,dado){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/sorteia',urlencodedParser, function (req, res) {
      fs.readFile('DadoPag.html', function (erro,dado){
      var sorteados={'1':0, '2':0, '3':0, '4':0, '5':0, '6':0};
      for (var i=0; i<50;i++){
        var sorteio=parseInt(Math.random()*(6)+1);
        var posicao= sorteio.toString;
        sorteados[sorteio]=(sorteados[sorteio]+1);
      }
      var valores = {
        'sorteio':"Esperando sorteio"
      };
      for (var i=1; i<7; i++){
        var add="sorteio"
        add=add+i
        valores[add]=sorteados[i];
      }

    for(var chave in valores){
      dado = ""+dado;
      dado = dado.replace("{{" + chave + "}}", valores[chave]);
    }
    setTimeout(function(){}, 50);
    res.writeHead(200, {'Content-type':'text/html'});

    res.write(dado);
    res.end("<h1>Jogo de Dados</h1>Batata?<img src=dado' + 1 + '.jpg>'");
  });
});
