<template>
   <header class="header">
      <a href="#" class="logo">
         <h1 data-shadow='dang!'>InstaCats</h1>
      </a>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">

         <li>
            <router-link to="/"><button class="floating-button">Home</button></router-link>
         </li>


         <li>
            <router-link to="/cats/new"><button class="floating-button">Upload</button></router-link>
         </li>


         <li>
            <router-link to="/cats/my"><button class="floating-button">View</button></router-link>
         </li>

      </ul>
   </header>
</template>

<script>
   import logo from '../../assets/5d3786cbb34d516c20e68bd6.png'
   export default {
      data: function () {
         return {
            logo
         }
      }
   }
</script>

<style>
   /* header */
   .header .logo {
      display: block;
      float: left;
      padding: 10px 20px;
      text-decoration: none;
      color: black;
   }

   .header {
      background-color: rgb(255, 113, 113);
      box-shadow: 1px 1px 61px 0 rgba(0, 0, 0, .1);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 3;
   }

   .header ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 10px;
      list-style: none;
      overflow: hidden;
      background-color: #fff;
   }

   .ava {
      width: 60pt;
      height: 60px;
   }

   .header li button {
      border: 0px;
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
   }

   .header li button:hover,
   .header .menu-btn:hover {
      background-color: #4CAF50;
      color: white;
   }

   .floating-button {
      text-decoration: none;
      display: inline-block;
      width: 150px;
      height: 45px;
      line-height: 25px;
      border-radius: 45px;
      margin: 10px 20px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      text-transform: uppercase;
      text-align: center;
      letter-spacing: 3px;
      font-weight: 600;
      color: #524f4e;
      background: white;
      box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
      transition: .3s;
   }

   .floating-button:hover {
      background: #2EE59D;
      box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
      color: white;
      transform: translateY(-7px);
   }

   .header .menu {
      clear: both;
      max-height: 0;
      transition: max-height .2s ease-out;
   }

   .header .menu-icon {
      cursor: pointer;
      display: flex;
      justify-content: end;
      padding: 28px 20px;
      position: relative;
      user-select: none;
   }

   .header .menu-icon .navicon {
      background: #333;
      display: block;
      height: 3px;
      position: relative;
      transition: background .2s ease-out;
      width: 18px;
   }

   .header .menu-icon .navicon:before,
   .header .menu-icon .navicon:after {
      background: #333;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      transition: all .2s ease-out;
      width: 100%;
   }

   .header .menu-icon .navicon:before {
      top: 5px;
   }

   .header .menu-icon .navicon:after {
      top: -5px;
   }

   .header .menu-btn {
      display: none;
   }

   .header .menu-btn:checked~.menu {
      max-height: 240px;
   }

   .header .menu-btn:checked~.menu-icon .navicon {
      background: transparent;
   }

   .header .menu-btn:checked~.menu-icon .navicon:before {
      transform: rotate(-45deg);
   }

   .header .menu-btn:checked~.menu-icon .navicon:after {
      transform: rotate(45deg);
   }

   .header .menu-icon .navicon:before {
      top: 5px;
   }

   .header .menu-icon .navicon:after {
      top: -5px;
   }

   .header .menu-btn {
      display: none;
   }

   .header .menu-btn:checked~.menu {
      max-height: 240px;
   }

   .header .menu-btn:checked~.menu-icon .navicon {
      background: transparent;
   }

   .header .menu-btn:checked~.menu-icon .navicon:before {
      transform: rotate(-45deg);
   }

   .header .menu-btn:checked~.menu-icon .navicon:after {
      transform: rotate(45deg);
   }

   .header .menu-btn:checked~.menu-icon:not(.steps) .navicon:before,
   .header .menu-btn:checked~.menu-icon:not(.steps) .navicon:after {
      top: 0;
   }

   /* 48em = 768px */
   @media (min-width: 48em) {
      .header li {
         float: left;
      }

      .header li>button {
         margin: 10px;
      }

      .header li>button {
         margin: 10px;
      }

      .header .menu {
         clear: none;
         float: right;
         max-height: none;
      }

      .header .menu-icon {
         display: none;
      }
   }

   /* TITLE LOGO */

   @import url(https://fonts.googleapis.com/css?family=Righteous);

   h1 {
      display: inline-block;
      color: rgb(252, 124, 124);
      font-family: 'Righteous', serif;
      font-size: 1.5em;
      text-shadow: .03em .03em 0 hsla(230, 40%, 50%, 1);
   }

   @keyframes shad-anim {
      0% {
         background-position: 0 0
      }

      0% {
         background-position: 100% -100%
      }
   }
</style>