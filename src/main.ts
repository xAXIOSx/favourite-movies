import { createPinia } from "pinia";
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.scss'
import UIComponents from './UI/index'

const app = createApp(App)

UIComponents.forEach((component)=>{
    app.component(component.name,component)
})

app.use(createPinia()).mount('#app')
