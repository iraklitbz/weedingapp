<template>
<div class="global">
  <div class="main-logo">
      <img alt="Vue logo" src="./assets/logo.png">
      <img class="rings" src="./assets/anillos.png">
  </div>
  <div class="general" id="app">
      <div v-on:click="toggleMenu" class="menu"  v-bind:class="{ open: isActive }">
        <ul>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block1')">Confirmación de asistencia</li>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block2')">¿Donde se celebra?</li>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block3')">Horario autobus</li>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block4')">Comparte tus fotos de la boda</li>
        </ul>
      </div>

  
     <div class="content">

        <div class="box" ref="block1">

    <div class="sended" v-if="isSended">
      <h2 class="main-headline">Muchas gracias por tu tiempo! recibido el formulario</h2>
    </div>
    <form v-if="!isSended">
          <h2 class="main-headline">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>

          <div class="flex-group">
            <h3 class="main-headline">¿Vas a asistir a la boda?</h3>
            <label class="switch">
              <input type="checkbox" checked v-model="weedingAsistentes.asistes">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="flex-group column">
            <h3 class="main-headline">Nombre</h3>
            <input class="form-control" v-bind:class="{ error: formError }" type="text" placeholder="Tu nombre" v-model="weedingAsistentes.nombre" v-on:change="inputCambiando">
            <span v-if="formError" class="small-text">Por favor, necesitamos saber tu nombre, muchas gracias</span>
          </div>
        <div class="flex-group" v-if="this.weedingAsistentes.asistes">
            <h3 class="main-headline">¿Vas acompañado/a?</h3>
            <label class="switch">
              <input type="checkbox" v-model="weedingAsistentes.pareja">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="flex-group column" v-if="this.weedingAsistentes.asistes">
            <h3 class="main-headline">¿Que sules tomar?</h3>
            <input class="form-control" type="text" placeholder="Whisky, Ron, Vino..." v-model="weedingAsistentes.bebida">
          </div>

            <div class="btn-send" v-on:click="SendForm">
              <span v-if="!loading">Enviar</span>
              <div v-if="loading" data-load="loading"></div>
            </div>
    </form>
   </div>

   <div class="box" ref="block2">
     <h2 class="main-headline">¿Donde se celebra?</h2>
   </div>

   <div class="box" ref="block3">
     <h2 class="main-headline">Horario autobuses</h2>
   </div>

    <div class="box" ref="block4">
     <h2 class="main-headline">Comparte tus fotos de la boda con nosotros subiendo a a una carpeta compartida!</h2>
     <a target="_blank" class="share-files" href="https://www.dropbox.com/request/iuBOXfBLEjwquaTldiCm">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M4,5h13v7h2V5c0-1.103-0.897-2-2-2H4C2.897,3,2,3.897,2,5v12c0,1.103,0.897,2,2,2h8v-2H4V5z"/><path d="M8 11L5 15 16 15 12 9 9 13z"/><path d="M19 14L17 14 17 17 14 17 14 19 17 19 17 22 19 22 19 19 22 19 22 17 19 17z"/></svg>
     </a>
   </div>
     </div>

      <div class="btn-circle" >
        <div v-on:click="toggleMenu" v-if="!this.isActive"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"/></svg></div>
        <div v-on:click="toggleMenu" v-if="this.isActive"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"/></svg></div>
      </div>
 
  </div>
</div>
</template>

<script>
 import { db } from './../firebase.js';
export default {
  name: 'App',
  data() {
    return {
      isActive: false,
      isSended: false,
      loading: false,
      formError: false,
      weedingAsistentes: {
        nombre: '',
        asistes: true,
        pareja: false,
        bebida: ''

      }
    }
  },
  methods:{
    toggleMenu() {
      this.isActive = !this.isActive
    },
    scrollToAnchorPoint(refName) {
      const el = this.$refs[refName]
      el.scrollIntoView({ behavior: 'smooth'})
    },
    inputCambiando(){
      console.log('asd')
      if(this.weedingAsistentes.nombre == '') {
        this.formError = true
      } else {
        this.formError = false
      }
    },
    SendForm() {
      if(this.weedingAsistentes.nombre == '') {
        this.formError = true
      }
      else {
        this.loading = !this.loading;
        this.formError = false;
        db.collection('asistentes').add({
          nombre: this.weedingAsistentes.nombre,
          asistes: this.weedingAsistentes.asistes,
          pareja: this.weedingAsistentes.pareja,
          bebida: this.weedingAsistentes.bebida
        })
        .then(doc => {
            console.log(doc.id)
            this.isSended = !this.isSended;
            this.loading = !this.loading;
        })
      }
    },

  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

[data-load] {
    width: 5em;
    height: 5em;
    border-radius: calc(5 / 16 * 1rem);
    position: relative;
    cursor: wait;
    overflow: clip;
    contain: content;
}

[data-load="loaded"] {
    cursor: auto;
}

[data-load]::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    aspect-ratio: 1 / 1;
    background-color: #fff;
}

[data-load="loaded"]::before {
    animation: explode 0.2s linear;
}

[data-load="loaded"]::after {
    display: none;
}

[data-load="loading"]::after {
    content: "";
    position: absolute;
    left: calc(50% - (0.75em / 2));
    top: calc(50% - (0.75em / 2));
    width: 0.75em;
    height: 0.75em;
    background-color: #fff;
    border-radius: 50%;
    display: block;
    animation: wiggle 0.3s linear infinite alternate;
}

@keyframes wiggle {
    0%,
    20% {
        transform: translatex(-1em) scalex(1);
        animation-timing-function: ease-in;
    }

    50% {
        transform: translatex(0) scalex(2);
        animation-timing-function: ease-out;
    }

    80%,
    100% {
        transform: translatex(1em) scalex(1);
    }
}

@keyframes explode {
    0% {
        transform: scale(0);
    }

    50% {
        opacity: 0.5;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}



input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
  font-size: 16px;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
 
}
.main-headline {
      font-family: 'ABeeZee', sans-serif;
      line-height: 33px;
}

.share-files {
 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 6px;
  cursor: pointer;
}

.share-files svg {
  fill: hsl(336, 52%, 49%);
}

h2.main-headline {
  font-size: 19px;
  margin-bottom: 30px;
  color: #4b8d88;
  text-align: center;
  font-style: italic;
}
h3.main-headline {
  font-size: 16px;
   color: #376763;
     text-align: center;
     
}
.h3.main-headline + input {
  margin-top: 7px;
}
.main-logo {
  text-align: center;
  max-width: 180px;
  width: 100%;
  margin: auto;
  margin-bottom: 0px;
  margin-top: 40px;
}

.rings {
  max-width: 90px;
  margin-top: 10px;
  margin-bottom: 40px;
}

.main-logo img {
  width: 100%;
}
body {
     background-color: #f3f3f3;
}
body:before {
  content:"";
  display: block;
  width: 100%;
  height: 300px;
  position: absolute;
  left: 0;
  top: 20px;
     background-image: url("./assets/verde.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.4;
}
.general {
  max-width: 800px;
  margin: 20px 10px;
  
  
}

@media (min-width: 800px) {
.general {
  max-width: 800px;
  margin: 20px auto;
}
}

.box {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px ;
}
.btn-circle {
  background-color: #be3c6f;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: none;
border: none;
cursor: pointer;
z-index: 9999;
}



.btn-circle svg {
  fill: #fff;
}

.menu {
  width: 100%;
  height: 86vh;
  position: fixed;
  top: -100%;
  left: 0px;
  transition: all 0.2s linear;
  background-color: #d9ebe9;
  border-bottom-left-radius: 9px;
   border-bottom-right-radius: 9px;
  box-shadow: 0 9px 9px -2px #ddd;
  z-index: 9998;
   display: flex;
  align-items: center;
}
.menu ul {
  width: 100%;
}

.menu:before {
  content: "";
  display: block;
  width: 90px;
  height: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  background-image: url("./assets/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  opacity: 0.6;
 
}

.menu:after {
  content: "";
  display: block;
  width: 90px;
  height: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  background-image: url("./assets/caballo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
 
}

.menu.open {
  top: -0;
}

.menu .nav-item {
  padding: 20px 40px 20px 20px;
  cursor: pointer;
  font-size: 18px;
  color: #4b8d88;
  font-weight: bold;
  display: block;
}

.menu .nav-item:not(:last-child) {
  border-bottom: 1px solid #bbdbd9;
}

.content .box:not(:last-child) {
  margin-bottom: 30px;
}
.sended h2 {
  margin-bottom: 0px;
}
.btn-send {
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 20px;
  background-color: steelblue;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px;
  border: none;
  cursor: pointer;
  margin: auto;
    margin-top: 30px;
    font-weight: bold;
}
.form-control{
  width: 100%;
  border: 1px solid #d9ebe9;
  border-radius: 6px;
  box-shadow: 0px;
  height: 55px;
  padding: 0px 0px 0 10px;
  background-color: #f2f8f8;
  transition: all 0.2s linear;
}
.form-control.error {
  border: 1px solid #be3c6f;
}
.form-control + .small-text {
  font-size: 13px;
  margin-top: 5px;
  color: #be3c6f;
}
.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #519b93
}
.form-control:focus{
  background-color: #fff;
}
.flex-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
     border-top:1px solid #d9ebe9 ;
         margin-bottom: 0px;
}
.flex-group.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px 0;
     border-top:none ;
      border-bottom:none ;
         margin-bottom: 30px;
}
.flex-group.column {
  flex-direction: column;
  justify-content: flex-start;
   align-items: flex-start;
}
.flex-group.column .main-headline {
  margin-bottom: 0px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
