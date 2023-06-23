const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: ` ${'1.'.green} Crear una tarea`
            }, 
            {
                value: '2',
                name: `${'2.'.green} Listar tarea(s)`
            }, 
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'7.'.green} Salir \n`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('==================================='.rainbow);
    console.log('  Seleccione una opción del menu'.white);
    console.log('===================================\n'.rainbow);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.magenta} para continuar \n`
        }
    ]

    await inquirer.prompt(question);
}

const leerInput = async( message ) => {
    const question  = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'                    
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: 0,
        name: '0'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( mensaje ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

}

const mostrarListadoCheckList = async( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ? true : false)
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    confirmar,
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList
}