var fs = require('fs');
var http = require('http');
var express= require('express');
var app = express();
const bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor na porta %s", porta);
});

app.get('/', function (req, res) {
  fs.readFile("form-precos.html", function(erro, dado) {
    res.writeHead(200, {'Content-type':'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/calcular', urlencodedParser, function(req, res) {
  fs.readFile('preco-res.html', function (erro, dado) {
    var valores ={
      'preco' : (Number(req.body.preco)*Number(req.body.quantidade))-Number(req.body.desconto)
    };
    for(var chave in valores){
      dado = dado.toString().replace("{{"+chave+"}}", valores[chave]);
    }
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(dado);
    res.end();
  });
});
