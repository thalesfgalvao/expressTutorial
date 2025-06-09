const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {//Método get simples em users
  res.send(users);//Response da requisição.
});

app.post('/users', (req, res) => {
  const user = req.body; //req.body é o que pega a requisição.
  users.push(user);//users.push insere um elemento no array
  res.send(users);//response da requisição
});

app.put('/users/:id', (req, res) => {//Put em um elemento através do id
  const index = users.findIndex((user) => user.id === ~~req.params.id); //findIndex vai encontrar o indice do array onde user.id é o mesmo que o parâmetro passado na requisição
  const user = req.body;//Pega o corpo da requisição
  users.splice(index, 1, user);//O indice encontrado acima é passado como um "for". Remove um item e no lugar desse item insere o user atualizado
  res.send(user);//Retorna o usuário atualizado
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === ~~req.params.id);//findIndex vai encontrar o indice do array onde user.id é o mesmo que o parâmetro passado na requisição
  users.splice(index, 1);//O indice encontrado acima é passado como um "for". Remove um item e não o substitui.
  res.send({ "message": "Usuário deletado." })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
