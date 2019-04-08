/*objeto javascript que va a importar lo siguiente..fichero de configuración*/
module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/minimoea',
    //añadimos el secret Token
    //SECRET_TOKEN: 'miclavedetokens'
}