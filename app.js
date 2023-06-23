require('colors');
const { guardarData, 
        leerDB 
} = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => { 
    let opt = '';
    const tareas = new Tareas();

    const tareasDB =  leerDB();
    if (tareasDB ) {
        //Establcer las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir el menu
        opt = await inquirerMenu();  

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                // console.log(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArray);
                tareas.toggleCompletadas( ids )
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArray);

                if ( id !== 0 ) {
                    const ok = await confirmar('¿Esta seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarData( JSON.stringify(tareas.listadoArray) );
        await pausa()
    } while (opt !== '0');
}

main();
