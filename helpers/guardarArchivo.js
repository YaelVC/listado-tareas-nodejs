const fs = require('fs');

const archivo = './database/data.json'

const guardarData = ( data ) => {
    fs.writeFileSync(archivo, data);
}

const leerDB = () => {
    if ( !fs.existsSync(archivo)) {
        return null
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarData,
    leerDB
}