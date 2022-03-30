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
  fs.readFile('Data-Pag.html', function (erro, dado) {
    var data=new Date;
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    var valores={
      'diaDaSemana': data.getDay() + '  ',
      'dataHora': +data.getDate()+' / '+monName[data.getMonth()]+' / '
      +data.getFullYear()+". ",
      'horario': data.getHours()+" : "+ data.getMinutes()+" : "+
      data.getSeconds() + " : " + data.getMilliseconds()
    };
    for(var chave in valores){
      dado =""+dado;
      dado = dado.replace("{{"+ chave +"}}", valores[chave]);
    }
    res.writeHead(200, {'Content-type':'text/html'});
    res.write(dado);
    res.end();
  });
});
