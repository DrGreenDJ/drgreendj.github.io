import './assets/main.css'

import { defineCustomElement } from 'vue'
import App from './App.vue'

const kundendatenGadget = defineCustomElement(App)

window.customElements.define('kundendaten-gadget', kundendatenGadget)
