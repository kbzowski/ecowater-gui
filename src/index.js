import React from 'react';
import ReactDOM from 'react-dom';
import './main.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
const tray = new nw.Tray({ title: 'Tray', icon: "./tray-icon.png" });
tray.menu = new nw.Menu();
tray.menu.append(new nw.MenuItem({ label: 'Exit', click: function(){
        nw.App.quit();
    } }));

tray.on('click', function () {
    const win = nw.Window.get();
    win.show()
});

const win = nw.Window.get();
win.on('close', function() {
    win.hide()
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
