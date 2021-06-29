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
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block34')">¿Nos quieres hacer algún regalo?</li>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block5')">Contacto</li>
          <li class="nav-item" v-on:click="scrollToAnchorPoint('block4')">Comparte tus fotos de la boda</li>
        </ul>
      </div>

  
     <div class="content">

        <div class="box" ref="block1">

    <div class="sended" v-if="isSended">
      <h2 class="main-headline">Muchas gracias por tu tiempo! recibido el formulario</h2>
    </div>
    <form v-if="!isSended">
          <h2 class="main-headline-alt"><b>¡Nos casamos!</b></h2>
          <h2 class="main-headline"> Esperamos que nos acompañéis el día <span>25 de septiembre</span> a las <span>18:15</span> en la casa rural Sabory en <span>hiendelaencina.</span></h2>

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
     <ul class="main-list">
       <li><span class="hour">18:30</span><span> Ceremonia</span> - Casa rural sabory.</li>
        <li><span class="hour">19:15</span><span> Cocktel</span> - Casa rural sabory.</li>
         <li><span class="hour">21:30</span><span> Cena</span> - Restaurante sabory (en la plaza)</li>
          <li><span>Después de cenar, música y barra libre</span> - Casa rural sabory</li>
     </ul>
   </div>

   <div class="box" ref="block3">
     <h2 class="main-headline">Horario autobuses</h2>
     <p>Próximamente</p>
   </div>

    <div class="box" ref="block34">
     <h2 class="main-headline">¿Nos quieres hacer algún regalo?</h2>
     <h6 class="small-headline">Nº de cuenta:</h6>
     <h4 class="main-headline bold">ES56 2085 7555 1703 3024 4767</h4>
     
   </div>

   <div class="box" ref="block5">
     <h2 class="main-headline">¿Cualquier duda?</h2>
     <div class="contact"><h2>Alicia: <a href="tel:+34665872614">665872614</a></h2> <a class="icon" href="https://api.whatsapp.com/send?phone=+34665872614"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403,5.633C16.708,3.936,14.454,3.001,12.053,3	c-4.948,0-8.976,4.027-8.978,8.977c0,1.582,0.413,3.126,1.198,4.488L3,21.116l4.759-1.249c1.312,0.715,2.788,1.092,4.29,1.093h0.004	l0,0c4.947,0,8.975-4.027,8.977-8.977C21.03,9.585,20.098,7.33,18.403,5.633 M12.053,19.445H12.05	c-1.339-0.001-2.652-0.36-3.798-1.041l-0.272-0.162l-2.824,0.741l0.753-2.753l-0.177-0.282c-0.747-1.188-1.141-2.561-1.141-3.971	c0.002-4.114,3.349-7.461,7.465-7.461c1.993,0.001,3.866,0.778,5.275,2.188c1.408,1.411,2.184,3.285,2.183,5.279	C19.512,16.097,16.165,19.445,12.053,19.445 M16.146,13.856c-0.225-0.113-1.327-0.655-1.533-0.73	c-0.205-0.075-0.354-0.112-0.504,0.112s-0.58,0.729-0.711,0.879s-0.262,0.168-0.486,0.056s-0.947-0.349-1.804-1.113	c-0.667-0.595-1.117-1.329-1.248-1.554s-0.014-0.346,0.099-0.458c0.101-0.1,0.224-0.262,0.336-0.393	c0.112-0.131,0.149-0.224,0.224-0.374s0.038-0.281-0.019-0.393c-0.056-0.113-0.505-1.217-0.692-1.666	C9.627,7.787,9.442,7.845,9.304,7.839c-0.13-0.006-0.28-0.008-0.429-0.008c-0.15,0-0.393,0.056-0.599,0.28	C8.07,8.336,7.491,8.878,7.491,9.982c0,1.104,0.804,2.171,0.916,2.321c0.112,0.15,1.582,2.415,3.832,3.387	c0.536,0.231,0.954,0.369,1.279,0.473c0.537,0.171,1.026,0.146,1.413,0.089c0.431-0.064,1.327-0.542,1.514-1.066	c0.187-0.524,0.187-0.973,0.131-1.067C16.52,14.025,16.369,13.968,16.146,13.856"/></svg></a></div>
     <div class="contact"><h2>Marco: <a href="tel:+34669148644">669148644</a></h2><a class="icon" href="https://api.whatsapp.com/send?phone=+34669148644"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403,5.633C16.708,3.936,14.454,3.001,12.053,3	c-4.948,0-8.976,4.027-8.978,8.977c0,1.582,0.413,3.126,1.198,4.488L3,21.116l4.759-1.249c1.312,0.715,2.788,1.092,4.29,1.093h0.004	l0,0c4.947,0,8.975-4.027,8.977-8.977C21.03,9.585,20.098,7.33,18.403,5.633 M12.053,19.445H12.05	c-1.339-0.001-2.652-0.36-3.798-1.041l-0.272-0.162l-2.824,0.741l0.753-2.753l-0.177-0.282c-0.747-1.188-1.141-2.561-1.141-3.971	c0.002-4.114,3.349-7.461,7.465-7.461c1.993,0.001,3.866,0.778,5.275,2.188c1.408,1.411,2.184,3.285,2.183,5.279	C19.512,16.097,16.165,19.445,12.053,19.445 M16.146,13.856c-0.225-0.113-1.327-0.655-1.533-0.73	c-0.205-0.075-0.354-0.112-0.504,0.112s-0.58,0.729-0.711,0.879s-0.262,0.168-0.486,0.056s-0.947-0.349-1.804-1.113	c-0.667-0.595-1.117-1.329-1.248-1.554s-0.014-0.346,0.099-0.458c0.101-0.1,0.224-0.262,0.336-0.393	c0.112-0.131,0.149-0.224,0.224-0.374s0.038-0.281-0.019-0.393c-0.056-0.113-0.505-1.217-0.692-1.666	C9.627,7.787,9.442,7.845,9.304,7.839c-0.13-0.006-0.28-0.008-0.429-0.008c-0.15,0-0.393,0.056-0.599,0.28	C8.07,8.336,7.491,8.878,7.491,9.982c0,1.104,0.804,2.171,0.916,2.321c0.112,0.15,1.582,2.415,3.832,3.387	c0.536,0.231,0.954,0.369,1.279,0.473c0.537,0.171,1.026,0.146,1.413,0.089c0.431-0.064,1.327-0.542,1.514-1.066	c0.187-0.524,0.187-0.973,0.131-1.067C16.52,14.025,16.369,13.968,16.146,13.856"/></svg></a></div>
     
   </div>


    <div class="box" ref="block4">
     <h2 class="main-headline">Comparte tus fotos de la boda con nosotros subiendo a una carpeta compartida!</h2>
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
      isSended: localStorage.sended,
      loading: false,
      formError: false,
      formIsSended: false,
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
            localStorage.sended = this.isSended;
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
.main-headline, .main-headline-alt {
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

h2.main-headline, h2.main-headline-alt {
  font-size: 19px;
  margin-bottom: 30px;
  color: #4b8d88;
  text-align: center;
  font-style: italic;
  
}
.small-headline {
   font-size: 14px;
  margin-bottom: 2px;
  color: #be3c6f;
  text-align: center;
  font-style: italic;
}
h4.main-headline {
    font-size: 19px;
  text-align: center;
  color: #294d4a;
}
h2.main-headline span {
    color: #294d4a;
  }

h2.main-headline-alt {
  margin-bottom: 5px;
   font-size: 24px;
   font-weight: 500;

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
.box p {
  text-align: center;
  font-style: italic;
  color: #4b8d88;
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

.main-list li {
font-size: 16px;
  margin-bottom: 10px;
  color: #4b8d88;
  text-align: left;
  font-style: italic;
  font-family: 'ABeeZee', sans-serif;
      line-height: 33px;
}

.main-list li span {
 color: #294d4a;
}

.main-list li .hour {
display: block;
text-align: left;
  color: #4b8d88;
}

.main-list li:last-child {
margin-top: 40px;
}

.main-headline.bold {
  background-color: #be3c6f;
  color: #fff;
  margin: -20px;
  margin-top: 10px;
  border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-family: 'ABeeZee', sans-serif;
   color: #4b8d88;
}

.contact:not(:last-child) {
  margin-bottom: 25px;
}

.contact h2 a {
  margin-left: 7px;
  color: #294d4a;
  text-decoration: none;
}

.contact svg {
  margin-left: 7px;
  fill: #4AC459;
}

</style>
