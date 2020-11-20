const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');
//crear otra  ventana precionando un boton
const buttonWin = document.getElementById('nueva-ventana');

buttonWin.addEventListener("click", (event) => {
    const modalPath = path.join("file://", __dirname, '/windows/automata1.html');

    let modal = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            enableBlinkFeatures: true
        }
    });

    modal.on("close", () => { modal = null });
    modal.loadURL(modalPath);
    modal.show();
});

const buttonWin2 = document.getElementById('nueva-ventana2');

buttonWin2.addEventListener("click", (event) => {
    const modalPath = path.join("file://", __dirname, '/windows/automata2.html');

    let modal = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            enableBlinkFeatures: true
        }
    });

    modal.on("close", () => { modal = null });
    modal.loadURL(modalPath);
    modal.show();
});