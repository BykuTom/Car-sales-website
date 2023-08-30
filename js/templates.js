export const headerTemplate = `
<template id="template"><header>
<nav class="navBar">
  <div class="navBarLogo">
    <img src="./img/SOUCLogo.png" alt="SOUC.Logo" />
  </div>
  <ul class="navLinks" aria-expanded="false">
    <li>
      <i class="icon fa-solid fa-sterling-sign"></i><a href="#">Finance</a>
    </li>
    <li>
      <i class="icon fa-regular fa-handshake"></i
      ><a href="#">Parts Exchange</a>
    </li>
    <li>
      <i class="icon fa-regular fa-comment-dots"></i
      ><a href="#">Contact Us</a>
    </li>
    <li>
      <span>Showroom</span>
      <ul class="navBarShowroomLinks">
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
      </ul>
    </li>
  </ul>
  <button class="navBarExpandButton"></button>
</nav>
</header></template>
`;
