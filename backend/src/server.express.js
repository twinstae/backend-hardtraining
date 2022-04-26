const express = require('express')
const app = express()
const port = 3000
const { addTodo, deleteTodo, completeTodo } = require('./todoList');

let todoList = [{ content: "일본 라면 먹기", completed: false, createdAt: 123 }];

app.use(express.json());
// app.use(express.urlencoded( { extended : false } ));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/todo-list', (req, res) => {
  
  
  res.status(200).send(todoList);
  
})

app.post('/todo-list', (req, res) => {
  const newTodo = req.body;
  todoList = addTodo(todoList, newTodo);
  console.log(res.body)
  res.status(201).send({ ok: true }); // 201 created
})

app.patch('/todo-list/:targetContent', (req, res) => {
  const { targetContent } = req.params;
  todoList = completeTodo(todoList, targetContent);
  res.status(200).send({ ok: true });
})


app.delete('/todo-list/:targetContent', (req, res) => {
  // 구조 분해 할당, destructuring
  const { targetContent } = req.params;

  todoList = deleteTodo(todoList, targetContent);
  res.status(204).send({ ok: true }); // 204 no content
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})