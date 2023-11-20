
const dal = require('./dal')

const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = 3000
app.use(body_parser.json())

// GET 
app.get('/api/employees', async (request, response) => {
    //console.log(request);
    const employees = await dal.get_all()
    console.log('someone did a get for /api/users URL');
    //response.send('<h1 style="color:blue">hi</h1>')
    response.json(employees)
})
// GET by ID
app.get('/api/employee/:id', (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = crud.get_by_id(user_id)
    if (user) { 
        response.json(user)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}`})
    }
})
// POST
app.post('/api/employee', (request, response) => {
    const new_user = request.body
    const updated_user = crud.post(new_user)
    response.status(201).json(updated_user)
    
})
// PUT
app.put('/api/employee/:id', (request, response) => {
    const updated_user_req = request.body
    const user_id = parseInt(request.params.id)
    const updated_or_created_user = crud.put(user_id, updated_user_req)
    response.json(updated_or_created_user)
})
// PATCH
app.patch('/api/employee/:id', (request, response) => {
    const updated_user_req = request.body
    const user_id = parseInt(request.params.id)
    const updated_user = crud.patch(user_id, updated_user_req)
    if (updated_user) { 
        response.json(updated_user)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}`})
    }
})

// DELETE
app.delete('/api/employee/:id', (request, response) => {
    const user_id = parseInt(request.params.id)
    const deleted = crud.delete_by_id(user_id)
    if (deleted) { 
        response.status(204).json({ "status": `user with id = ${user_id} deleted`})
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}`})
    }
})


app.listen(3000, () => {
    console.log('Express server is running ....');
})


async function go()  {
    console.log(1);
    const employees = await dal.get_all()
    console.log(employees);
    const employee = await dal.get_by_id(1)
    console.log(employee);
    // insert
    // update
    // delete
}

go()