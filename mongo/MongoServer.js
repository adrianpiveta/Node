var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const cliente = new MongoClient( url, {
  useNewUrlParser: true,
  useUnifiedTopology: true });

async function listar(){
  try {
    await cliente.connect();
    console.log("Conectado");
    const banco = cliente.db("loja");
    var cursor = banco.collection('produtos').find();
    await cursor.forEach( function(doc) {
      console.log("---");
      console.log("Código: "+doc.codigo);
      console.log("Descrição: "+doc.descricao);
      console.log("Preço: "+doc.preco);
    });
    }


  finally {
    await cliente.close();
  }
}
async function cadastrar() {
  try {
    await cliente.connect();
    console.log("Conectado");
    const banco = cliente.db("loja");
    var cursor = banco.collection('produtos').find();
    await banco.collection('produtos').insertOne({ codigo: 10,
      descricao: 'Cama de casal',
      preco: 250});
  } finally {
    console.log('Inserido!');
    await cliente.close();

  }

}

async function aplicarDesconto(){
  try {
    await cliente.connect();
    console.log("Conectado");
    const banco = cliente.db('loja');
    await banco.collection('produtos').updateMany(
      {preco: {$gt: 2000.00}},
      {$mul: {preco: 0.9}}
    );
  } finally {
    console.log("Alterado");
    await cliente.close();

  }
}

async function apagar(){
  const cliente = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true });
  try {
    await cliente.connect();
    console.log("Conectado");
    const banco = cliente.db("loja");
    await banco.collection("produtos").deleteOne(
      {codigo: 15}
    );
  }
  finally {
    console.log("Apagado");
    await cliente.close();

  }
}

//cadastrar();
//listar();
//apagar();
listar();
//aplicarDesconto();

/*
var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});
*/
