const dal = require('./dal')

const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = 3000
app.use(body_parser.json())

// GET 
app.get('/api/employee', async (request, response) => {
    const employees = await dal.get_all()
    response.json(employees)
})
// GET by ID
app.get('/api/employee/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    if (user) {
        response.json(user)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}` })
    }
})
// POST
app.post('/api/employee', async (request, response) => {
    const new_user = request.body
    const result = await dal.new_employee(new_user)
    response.status(201).json(result)
})
// PUT
app.put('/api/employee/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    if (user) {
        // user exists ==> perform update
        const updated_user_req = request.body
        const result = await dal.update_emplyee(user_id, updated_user_req)
        response.json(updated_user_req)
    }
    else {
        // user does NOT exist ==> perform insert
        const new_user = request.body
        const result = await dal.new_employee(new_user)
        response.status(201).json(result)
    }
})
// PATCH
app.patch('/api/employee/:id', async (request, response) => {
    const updated_user_req = request.body
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    // override only existing fields in the user from the db
    const result = await dal.update_emplyee(user_id, { ...user, ...updated_user_req })
    response.json({ result })

})

// DELETE
app.delete('/api/employee/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const result = await dal.delete_employee(user_id)
    response.status(204).json({ result })

})


app.listen(3000, () => {
    console.log('Express server is running ....');
})
