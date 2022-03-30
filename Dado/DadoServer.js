var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use('/images', express.static('../images'));
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
    var valores ={
      'origem' : 'dado1.jpg'
    }
    res.writeHead(200, {'Content-type':'text/html'});
    res.write(dado);
    res.end();
    });
});
