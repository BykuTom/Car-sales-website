export const headerTemplate = `
<template id="template"><header>
<nav class="navBar">
  <div class="navBarLogo">
  <a href="./index.html"></a>
    <img src="./assets/images/SOUCLogo.png" alt="SOUC.Logo" />
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
  <button class="navBarExpandButton"><div class="bar"></div></button>
</nav>
</header></template>
`;
export const footerTemplate = `<template id="footerTemplate">
<footer>
      <section class="footerGrid">
        <p>
          Hoptons of Epworth Limited T/A Save On Used Cars is authorised and
          regulated by the Financial Conduct Authority, FRN: 655099. All finance
          is subject to status and income. Written quotation on request. We act
          as a credit broker not a lender. We work with a number of carefully
          selected credit providers who may be able to offer you finance for
          your purchase. We are only able to offer finance products from these
          providers.
        </p>
        <p>
          We can introduce you to a limited number of finance providers. We do
          not charge fees for our Consumer Credit services. We may receive a
          payment(s) or other benefits from finance providers should you decide
          to enter into an agreement with them, typically either a fixed fee or
          a fixed percentage of the amount you borrow. The payment we receive
          may vary between finance providers and product types. The payment
          received does not impact the finance rate offered.
        </p>
        <p>
          <strong>Please note</strong> - Retail customers using a finance broker
          outside our official panel of lenders, due to the fees incurred
          through these providers, a £225 admin fee is applied to these deals.
        </p>
        <p>
          *It is our intention to provide a high level of service at all times.
          However if you have reason to make a complaint about our service you
          should contact Save On Used Cars at 44 Normanby Road, Scunthorpe,
          Lincolnshire, DN15 6AL. If we are unable to resolve your complaint
          satisfactorily, you may be entitled to refer the matter to the
          Financial Ombudsman Service (FOS). Further information is available by
          calling the FOS on 0845 080 1800 or at<strong>&nbsp;</strong
          ><a
            href="https://www.financial-ombudsman.org.uk/"
            rel="nofollow"
            target="_blank"
            title="Follow link"
            ><strong>https://www.financial-ombudsman.org.uk</strong>*</a
          >&nbsp;
        </p>
        <div class="footer-links">
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/cookie-policy">Cookie Policy</a>
        </div>
        <div class="copyright">
          <p class="small">
            Copyright © 2023 Save On Used Cars. All Rights Reserved.<br />
            <strong>VAT Number</strong> - 110 1100 18 |
            <strong>Company Number</strong> - 790 6047 |
            <strong>FCA Number</strong> - 655 099
          </p>
        </div>
      </section>
    </footer>
</template>`;
export const carouselTemplate = `<template id="carouselTemplate">
<div class="carCarousel" data-carousel>
  <button
    class="carousel-button carousel-button-left"
    data-carousel-button="prev"
  >
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  <button
    class="carousel-button carousel-button-right"
    data-carousel-button="next"
  >
    <i class="fa-solid fa-chevron-right"></i>
  </button>
  <ul data-slides class="carousel"></ul>
</div>
</template>`;
export const carCardTemplate = `<template id="carouselTemplate"><section class="carCard" keyID="">
<a href=""></a>
<div class="infobox">
  <div class="makeModel">
    <h1 class="make"></h1>
    <h2 class="model"></h2>
  </div>
  <div class="PriceFinance">
    <h2 class="price"></h2>
    <h3 class="finance"></h3>
  </div>
</div>
<div class="carImageBox"><img src="" alt="An Image" /></div>
<div class="moreInfoBox">
  <div class="gearbox">
    <h3>Gear Box</h3>
    <h4 class="gear">Placeholder</h4>
  </div>
  <div class="body">
    <h3>Body</h3>
    <h4 class="gear">Placeholder</h4>
  </div>
  <div class="fuel">
    <h3>Fuel Type</h3>
    <h4 class="gear">Placeholder</h4>
  </div>
  <div class="engine">
    <h3>Engine Size</h3>
    <h4 class="gear">Placeholder</h4>
  </div>
</div>
</section></template>`;
