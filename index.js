
require('./config/config')
const app = require('./app')
require('./db/conexion')

const port = process.env.PORT || 7070



app.listen(port, () => {
    console.log(`🚀 Server rady at http://localhost:${port}`);
})