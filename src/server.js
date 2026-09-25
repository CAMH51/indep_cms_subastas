require('dotenv').config();
const app = require('./app');
const {sequelize} = require('./models')

const PORT = process.env.PORT || 3400;

async function iniciar(){
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida correctamente.');
        
        app.listen(PORT, async() =>{
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No fue posible iniciar la aplicación', error);
        process.exit(1);
    }
}

iniciar();