
const dal = require('./dal')

async function go()  {
    console.log(1);
    const employees = await dal.get_all()
    console.log(employees);
    const employee = await dal.get_by_id(1)
    console.log(employee);
}

go()