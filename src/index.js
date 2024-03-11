import React from 'react';
import {render} from "react-dom";
import './index.scss';
import App from "./App";
import renderHTML from "./main";

const bodyForRoot = document.querySelector('body');
const div = document.createElement("div");
div.id = 'root';
div.className = 'root'

renderHTML();
bodyForRoot.prepend(div);

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
