const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
  }
  
func()

let count = 0;
const countDisplay = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');

incrementBtn.addEventListener('click', () => {
  count += 4;
  countDisplay.innerText = count;
});


const { ipcRenderer } = require('electron');

ipcRenderer.on('update_available', () => {
  alert('A new update is available. Downloading now...');
});

ipcRenderer.on('update_downloaded', () => {
  alert('Update downloaded. App will restart to install.');
});
