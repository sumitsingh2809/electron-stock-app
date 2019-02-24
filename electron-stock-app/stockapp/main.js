const electron = require("electron");
const path = require("path");
const url = require("url");

const { app, BrowserWindow, Menu, ipcMain } = electron;
let mainWindow;
let addWindow;

// Listem for app to be ready
app.on("ready", createMainWindow);

function createMainWindow() {
  // Create BrowserWindow
  mainWindow = new BrowserWindow({});

  //   Load index.html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "view/mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Quit app when closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  //   Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //   Insert Menu
  Menu.setApplicationMenu(mainMenu);
}

// Create menu template
const mainMenuTemplate = [
  //   {
  //     label: "File",
  //     submenu: [
  //       {
  //         label: "Add Item",
  //         click() {
  //           createAddWindow();
  //         }
  //       },
  //       {
  //         label: "Clear Items",
  //         click() {
  //           mainWindow.webContents.send("item:clear");
  //         }
  //       },
  //       {
  //         label: "Quit",
  //         accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
  //         click() {
  //           app.quit();
  //         }
  //       }
  //     ]
  //   }
];

// if mac, add empty object to menu
// if (process.platform == "darwin") {
//   mainMenuTemplate.unshift({ label: "Electron" });
// }

// add developer tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
