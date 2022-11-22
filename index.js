const {globalShortcut,BrowserWindow,app} = require("electron");
const Store = require('electron-store');

app.on('ready',()=>{
    let mainWindow=new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            contextIsolation: false,  //跟窗口的打开有关
            enableRemoteModule: true,
            webSecurity: false,
            webviewTag: true
        }
    })
    //store初始化
    Store.initRenderer()
    //注册全局快捷键
    globalShortcut.register('ctrl+e',()=>{
        //打开调试工具
        mainWindow.webContents.openDevTools()
    })

    //修复remote失效
    require("@electron/remote/main").initialize()
    require("@electron/remote/main").enable(mainWindow.webContents)

    mainWindow.loadURL('http://localhost:8080/')
    mainWindow.on('closed',()=>{
        mainWindow=null
    })
})
