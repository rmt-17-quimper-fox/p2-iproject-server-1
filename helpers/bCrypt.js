const bcryptjs = require('bcryptjs')


function hashingPaswword (password) {
    return bcryptjs.hashSync(password, 10)
}

function comparePassword(password = '', hashpassword = '') {
    return bcryptjs.compareSync(password,hashpassword)
}


module.exports = {
    hashingPaswword,
    comparePassword
}