const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');

const button2 = document.getElementById('verificar2');

const automata2 = {
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

button2.addEventListener("click", function() {
    let cadena = document.getElementById('txtCadena2').value;
    let estadoActual = automata2.estadoInicial;
    let error = false;
    let pila = Array();
    pila.push('');

    cadena.split('').forEach(simbolo => {
        let encuentraTransicion = false;

        automata2.transiciones.forEach(transicion => {
            //hacemos la comparacion logica para leer la pila
            if (transicion.estado == estadoActual && transicion.simbolo ==
                simbolo && encuentraTransicion == false &&
                transicion.simboloPila == pila[(pila.length - 1)]) {
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
        //comparamos para ver si cumple y mostrar mensaje
        if (automata2.estadoFinal == estadoActual && pila.length == 0) {
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
        dialog.showErrorBox('Error', 'Alguno de los caractéres que ingresó no pertenece a el alfabeto Español');
        return;
    }
});