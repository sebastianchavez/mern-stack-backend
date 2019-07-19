require('dotenv').config()
const app = require('./app')
require('./db')

const main = async () => {
    await app.listen(app.get('port'))
    console.log(`Server on port ${app.get('port')}` )
}

main()