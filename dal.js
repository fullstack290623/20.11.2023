
const knex = require('knex')

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'project.db'
    }
})

async function get_all() {
    // db.run('select * from company')
    const emplyees = await connectedKnex('COMPANY').select('*')
    return emplyees
}

async function get_by_id(id) {
    // db.run('select * from company where id=?')
    const emplyee = await connectedKnex('COMPANY').select('*').where('id', id).first()
    return emplyee
}

async function new_employee(new_emp) {
    // db.run('insert into company ....')
    // result[0] will be the new ID given by the SQL
    const result = await connectedKnex('COMPANY').insert(new_emp)
    return { ...new_emp, ID: result[0] }
}

async function update_emplyee(id, updated_employee) {
    // db.run('update company ....')
    const result = await connectedKnex('COMPANY').where('id', id).update(updated_employee)
    return updated_employee
}

async function delete_employee(id) {
    // db.run('update company ....')
    const result = await connectedKnex('COMPANY').where('id', id).del()
    return result
}

module.exports = {
    get_all, get_by_id, new_employee, update_emplyee, delete_employee
}
