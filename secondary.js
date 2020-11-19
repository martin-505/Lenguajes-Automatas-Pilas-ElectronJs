const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');

const button = document.getElementById('verificar');

const automata = {
    estadoInicial: 0,
    estadoFinal: 1,
    transiciones: [{
            estado: 0,
            simbolo: 'a',
            simboloPila: '',
            insertarPila: ['A'],
            al_estado: 0
        },
        {
            estado: 0,
            simbolo: 'a',
            simboloPila: 'A',
            insertarPila: ['A', 'A'],
            al_estado: 0
        },
        {
            estado: 0,
            simbolo: 'b',
            simboloPila: 'A',
            insertarPila: ['B'],
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'b',
            simboloPila: 'B',
            insertarPila: [''],
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'b',
            simboloPila: 'A',
            insertarPila: ['B'],
            al_estado: 1
        }
    ]
};

button.addEventListener("click", function() {
    let cadena = document.getElementById('txtCadena').value;
    let estadoActual = automata.estadoInicial;
    let error = false;
    let x = 0;
    let pila = Array();
    pila.push('');
    console.log(cadena.length);

    cadena.split('').forEach(simbolo => {
        console.log(simbolo);
        let encuentraTransicion = false;

        automata.transiciones.forEach(transicion => {
            if (transicion.estado == estadoActual && transicion.simbolo == simbolo && encuentraTransicion == false && transicion.simboloPila == pila[(pila.length - 1)]) {
                estadoActual = transicion.al_estado;
                pila.pop();
                for (let i = 0; i < (transicion.insertarPila.length); i++) {
                    if (transicion.insertarPila != "") {
                        pila.push(transicion.insertarPila[i]);
                    }
                }
                encuentraTransicion = true;
                return;
            }
        });

        if (!encuentraTransicion) {
            error = true;
            return;
        }

    });

    if (!error) {
        if (automata.estadoFinal == estadoActual && pila.length == 0) {
            let options = {
                buttons: ["Aceptar"],
                message: "Pila correcta"
            };
            dialog.showMessageBox(options);
            return;
        } else {
            dialog.showErrorBox('Error', 'Pila Incorrecta');
            return;
        }
    } else {
        dialog.showErrorBox('Error', 'Alguno de los caracteres que ingresó no pertenece al alfabeto Español');
        return;
    }
});