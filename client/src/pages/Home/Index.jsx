import { useHostname } from "../../hooks/utility";
import { Link } from "react-router-dom";
import { GrBitcoin } from "react-icons/gr";
import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useGetAllUnauthedCryptosQuery } from "../../store/services/crypto/cryptoService";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Index() {
  const { user } = useSelector((state) => state.auth);
  const hostname = useHostname();
  const [selectedOption, setSelectedOption] = useState("buy"); // Default to 'buy'
  const { data: cryptoData } = useGetAllUnauthedCryptosQuery({});
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const bitcoin = cryptoData?.find((crypto) => crypto.name === "bitcoin");
  return (
    <>
      <link rel="stylesheet" href="css/font-awesome.min.css" />
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/magnific-popup.css" />
      <link rel="stylesheet" href="css/select2.min.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/blue.css" />
      <div className="wrapper bg-gray-600">
        <header className="bg-gray-800 fixed w-full z-50">
          <nav
            className="mx-auto flex max-w-8xl items-center justify-between gap-x-6 p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link
                to="/"
                className="flex items-center text-4xl font-semibold text-white "
              >
                <GrBitcoin className="mr-2 !text-4xl" />
                {hostname}
              </Link>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-semibold leading-6 text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
            {user ? (
              <div className="flex items-center">
                <div className="h-8">
                  <MdOutlineAccountCircle className="h-8 w-8 text-white mr-2" />
                </div>
                <p className="h-8">My account</p>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-end gap-x-6">
                <Link
                  to="/login"
                  className="lg:block !text-xl sm:!text-xl md:!text-2xl lg:!text-2xl xl:!text-2xl 2xl:!text-2xl lg:leading-6 text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-md w-32 text-center bg-blue-500 px-3 py-2 !text-xl sm:!text-xl md:!text-2xl lg:!text-2xl xl:!text-2xl 2xl:!text-2xl hover:bg-white hover:text-black transition duration-300 text-white shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </header>
        {/* Header Ends */}
        {/* Slider Starts */}
        <div
          id="main-slide"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          {/* Indicators Starts */}
          <ol className="carousel-indicators visible-lg visible-md">
            <li
              data-target="#main-slide"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#main-slide" data-slide-to={1} />
            <li data-target="#main-slide" data-slide-to={2} />
          </ol>
          {/* Indicators Ends */}
          {/* Carousel Inner Starts */}
          <div className="carousel-inner">
            {/* Carousel Item Starts */}
            <div className="item active bg-parallax item-1">
              <div className="slider-content">
                <div className="container">
                  <div className="slider-text text-center">
                    <h3 className="slide-title !text-4xl sm:!text-4xl md:!text-6xl lg:!text-6xl xl:!text-6xl 2xl:!text-6xl">
                      <span>Secure</span> and <span>Easy Way</span>
                      <br /> To Buy & Sell Cryptocurrency
                    </h3>
                    <p>
                      <a href="about.html" className="slider btn btn-primary">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Carousel Item Ends */}
            {/* Carousel Item Starts */}
            <div className="item bg-parallax item-2">
              <div className="slider-content">
                <div className="col-md-12">
                  <div className="container">
                    <div className="slider-text text-center">
                      <h3 className="slide-title">
                        <span>Crypto Currency</span> Exchange <br />
                        You can <span>Trust</span>{" "}
                      </h3>
                      <p>
                        <a
                          href="pricing.html"
                          className="slider btn btn-primary"
                        >
                          our prices
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Carousel Item Ends */}
          </div>
          {/* Carousel Inner Ends */}
          {/* Carousel Controlers Starts */}

          {/* Carousel Controlers Ends */}
        </div>
        {/* Slider Ends */}
        {/* Features Section Starts */}
        <section className="features">
          <div className="container">
            <div className="row features-row">
              {/* Feature Box Starts */}
              <div className="feature-box col-md-4 col-sm-12">
                <span className="feature-icon">
                  <img
                    src="images/icons/blue/download-bitcoin.png"
                    alt="download bitcoin"
                  />
                </span>
                <div className="feature-box-content">
                  <h3>Download Crypto Currency Wallet</h3>
                  <p>
                    Get it on PC or Mobile to create, send and receive bitcoins.
                  </p>
                </div>
              </div>
              {/* Feature Box Ends */}
              {/* Feature Box Starts */}
              <div className="feature-box two col-md-4 col-sm-12">
                <span className="feature-icon">
                  <img
                    src="images/icons/blue/add-bitcoins.png"
                    alt="add bitcoins"
                  />
                </span>
                <div className="feature-box-content">
                  <h3>Add coins to your Wallet</h3>
                  <p>
                    Add bitcoins you’ve created or exchanged via credit card.
                  </p>
                </div>
              </div>
              {/* Feature Box Ends */}
              {/* Feature Box Starts */}
              <div className="feature-box three col-md-4 col-sm-12">
                <span className="feature-icon">
                  <img
                    src="images/icons/blue/buy-sell-bitcoins.png"
                    alt="buy and sell bitcoins"
                  />
                </span>
                <div className="feature-box-content">
                  <h3>Buy/Sell with Wallet</h3>
                  <p>Enter receiver's address, specify the amount and send.</p>
                </div>
              </div>
              {/* Feature Box Ends */}
            </div>
          </div>
        </section>
        {/* Features Section Ends */}
        {/* About Section Starts */}
        <section className="about-us ">
          <div className="container">
            {/* Section Title Starts */}
            <div className="row text-center">
              <h2 className="title-head">
                About <span>Us</span>
              </h2>
              <div className="title-head-subtitle">
                <p>
                  Crypto Currency trading website. Perfect for investing and
                  long term storage with our secure offline wallets
                </p>
              </div>
            </div>
            {/* Section Title Ends */}
            {/* Section Content Starts */}
            <div className="row about-content">
              {/* Image Starts */}
              <div className="col-sm-12 col-md-5 col-lg-6 text-center">
                <img
                  className="img-responsive img-about-us"
                  src="bg-2.png"
                  alt="about us"
                />
              </div>
              {/* Image Ends */}
              {/* Content Starts */}
              <div className="col-sm-12 col-md-7 col-lg-6">
                <h3 className="title-about">WE ARE {hostname}</h3>
                <p className="about-text">
                  A place for everyone who wants to buy and sell Crypto. Deposit
                  funds using your Visa/MasterCard. Instant buy/sell of
                  Bitcoins. Nothing extra. Join over 36,000 users from all over
                  the world satisfied with our services.
                </p>
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a data-toggle="tab" href="#menu1">
                      Our Mission
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="menu1" className="tab-pane fade in active">
                    <p>
                      We are here because we are passionate about open,
                      transparent markets and aim to be a major driving force in
                      widespread adoption.
                    </p>
                  </div>
                </div>
              </div>
              {/* Content Ends */}
            </div>
            {/* Section Content Ends */}
          </div>
        </section>
        {/* About Section Ends */}
        {/* Features and Video Section Starts */}
        <section className="image-block">
          <div className="container-fluid">
            <div className="row">
              {/* Features Starts */}
              <div className="col-md-12 ts-padding img-block-left">
                <div className="gap-20" />
                <div className="row">
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/strong-security.png"
                          alt="strong security"
                        />
                      </span>
                      <h3 className="feature-title">Strong Security</h3>
                      <p>
                        Protection against DDoS attacks, <br />
                        full data encryption
                      </p>
                    </div>
                  </div>
                  {/* Feature Ends */}
                  <div className="gap-20-mobile" />
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/world-coverage.png"
                          alt="world coverage"
                        />
                      </span>
                      <h3 className="feature-title">World Coverage</h3>
                      <p>
                        Providing services in 99% countries
                        <br /> around all the globe
                      </p>
                    </div>
                  </div>
                  {/* Feature Ends */}
                </div>
                <div className="gap-20" />
                <div className="row">
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/payment-options.png"
                          alt="payment options"
                        />
                      </span>
                      <h3 className="feature-title">Payment Options</h3>
                      <p>
                        Popular methods: Visa, MasterCard, <br />
                        bank transfer, cryptocurrency
                      </p>
                    </div>
                  </div>
                  {/* Feature Ends */}
                  <div className="gap-20-mobile" />
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/mobile-app.png"
                          alt="mobile app"
                        />
                      </span>
                      <h3 className="feature-title">Mobile App</h3>
                      <p>
                        Trading via our Mobile App, Available
                        <br /> in Play Store &amp; App Store
                      </p>
                    </div>
                  </div>
                  {/* Feature Ends */}
                </div>
                <div className="gap-20" />
                <div className="row">
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/cost-efficiency.png"
                          alt="cost efficiency"
                        />
                      </span>
                      <h3 className="feature-title">Cost efficiency</h3>
                      <p>
                        Reasonable trading fees for takers
                        <br /> and all market makers
                      </p>
                    </div>
                  </div>
                  {/* Feature Ends */}
                  <div className="gap-20-mobile" />
                  {/* Feature Starts */}
                  <div className="col-sm-6 col-md-6 col-xs-12">
                    <div className="feature text-center">
                      <span className="feature-icon">
                        <img
                          src="images/icons/blue/high-liquidity.png"
                          alt="high liquidity"
                        />
                      </span>
                      <h3 className="feature-title">High Liquidity</h3>
                      <p>
                        Fast access to high liquidity orderbook
                        <br /> for top currency pairs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="container">
            <div className="row text-center">
              <h2 className="title-head">
                No hidden <span>fees</span>
              </h2>
              <div className="title-head-subtitle">
                <p>
                  {hostname} will not suprise you with any fees, we have the
                  best prices on the market
                </p>
              </div>
            </div>

            <div className="row pricing-tables-content">
              <div className="pricing-container">
                <div className="pricing-switcher">
                  <p>
                    <input
                      type="radio"
                      name="switch"
                      value="buy"
                      id="buy-1"
                      checked={selectedOption === "buy"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="buy-1">BUY</label>

                    <input
                      type="radio"
                      name="switch"
                      value="sell"
                      id="sell-1"
                      checked={selectedOption === "sell"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="sell-1">SELL</label>

                    <span className="switch" />
                  </p>
                </div>

                <ul className="pricing-list bounce-invert">
                  <li className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <ul className="pricing-wrapper">
                      <li data-type="buy" className="is-visible">
                        <header className="pricing-header">
                          <h2>
                            {selectedOption} 0.1 BTC <span>For </span>
                          </h2>
                          <div className="price">
                            <span className="currency">
                              <i className="fa fa-dollar" />
                            </span>
                            <span className="value">
                              {Math.round(bitcoin?.price * 0.1)}
                            </span>
                          </div>
                        </header>
                        <footer className="pricing-footer">
                          <Link to="/login" className="btn btn-primary">
                            Place Order
                          </Link>
                        </footer>
                      </li>
                    </ul>
                  </li>
                  <li className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <ul className="pricing-wrapper">
                      <li data-type="buy" className="is-visible">
                        <header className="pricing-header">
                          <h2>
                            {selectedOption} 0.5 BTC <span>For </span>
                          </h2>
                          <div className="price">
                            <span className="currency">
                              <i className="fa fa-dollar" />
                            </span>
                            <span className="value">
                              {Math.round(bitcoin?.price * 0.5)}
                            </span>
                          </div>
                        </header>
                        <footer className="pricing-footer">
                          <Link to="/login" className="btn btn-primary">
                            Place Order
                          </Link>
                        </footer>
                      </li>
                    </ul>
                  </li>
                  <li className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <ul className="pricing-wrapper">
                      <li data-type="buy" className="is-visible">
                        <header className="pricing-header">
                          <h2>
                            {selectedOption} 1 BTC <span>For </span>
                          </h2>
                          <div className="price">
                            <span className="currency">
                              <i className="fa fa-dollar" />
                            </span>
                            <span className="value">
                              {Math.round(bitcoin?.price)}
                            </span>
                          </div>
                        </header>
                        <footer className="pricing-footer">
                          <Link to="/login" className="btn btn-primary">
                            Place Order
                          </Link>
                        </footer>
                      </li>
                    </ul>
                  </li>
                  <li className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                    <ul className="pricing-wrapper">
                      <li data-type="buy" className="is-visible">
                        <header className="pricing-header">
                          <h2>
                            {selectedOption} 10 BTC <span>For </span>
                          </h2>
                          <div className="price">
                            <span className="currency">
                              <i className="fa fa-dollar" />
                            </span>
                            <span className="value">
                              {Math.round(bitcoin?.price * 9)}
                            </span>
                          </div>
                        </header>
                        <footer className="pricing-footer">
                          <Link to="/login" className="btn btn-primary">
                            Place Order
                          </Link>
                        </footer>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        
        {/* Team Section Ends */}
        {/* Quote and Chart Section Starts */}
        <section className="image-block2">
          <div className="container-fluid">
            <div className="row">
              {/* Quote Starts */}
              <div className="col-md-6 img-block-quote">
                <blockquote>
                  <p>
                    Crypto Currency is one of the most important inventions in
                    all of human history. For the first time ever, anyone can
                    send or receive any amount of money with anyone else,
                    anywhere on the planet, conveniently and without
                    restriction. It’s the dawn of a better, more free world.
                  </p>
                  <footer>
                    <img
                      src="jason-sanders.webp"
                      className="h-20"
                      alt="ceo"
                    />{" "}
                    <div className="h-4"></div>
                    <span>Jason Sanders</span> - CEO
                  </footer>
                </blockquote>
              </div>
              {/* Quote Ends */}
              {/* Chart Starts */}
              <div className="col-md-6 py-8">
                <img src="bg-3.png" />
              </div>
              {/* Chart Ends */}
            </div>
          </div>
        </section>

        <section className="call-action-all">
          <div className="call-action-all-overlay">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  {/* Call To Action Text Starts */}
                  <div className="action-text">
                    <h2>Get Started Today With Crypto Currency</h2>
                    <p className="lead">
                      Open account for free and start trading Bitcoins!
                    </p>
                  </div>
                  {/* Call To Action Text Ends */}
                  {/* Call To Action Button Starts */}
                  <p className="action-btn">
                    <Link to="/register" className="btn btn-primary">
                      Register Now
                    </Link>
                  </p>
                  {/* Call To Action Button Ends */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call To Action Section Ends */}
        {/* Footer Starts */}
        <footer className="footer">
          {/* Footer Top Area Starts */}
          <div className="top-footer">
            <div className="container">
              <div className="row">
                {/* Footer Widget Starts */}
                <div className="col-sm-4 col-md-2">
                  <h4>Our Company</h4>
                  <div className="menu">
                    <ul>
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="services.html">Services</a>
                      </li>
                      <li>
                        <a href="pricing.html">Pricing</a>
                      </li>
                      <li>
                        <a href="blog-right-sidebar.html">Blog</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Footer Widget Ends */}
                {/* Footer Widget Starts */}
                <div className="col-sm-4 col-md-2">
                  <h4>Help &amp; Support</h4>
                  <div className="menu">
                    <ul>
                      <li>
                        <a href="faq.html">FAQ</a>
                      </li>
                      <li>
                        <a href="terms-of-services.html">Terms of Services</a>
                      </li>
                      <li>
                        <a href="404.html">404</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="coming-soon.html">Coming Soon</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Footer Widget Ends */}
                {/* Footer Widget Starts */}
                <div className="col-sm-4 col-md-3">
                  <h4>Contact Us </h4>
                  <div className="contacts">
                    <div>
                      <span>contact@{hostname}</span>
                    </div>
                    <div>
                      <span>00216 21 184 010</span>
                    </div>
                    <div>
                      <span>London, England</span>
                    </div>
                    <div>
                      <span>mon-sat 08am ⇾ 05pm</span>
                    </div>
                  </div>
                  {/* Social Media Profiles Starts */}
                  <div className="social-footer">
                    <ul>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Social Media Profiles Ends */}
                </div>
                {/* Footer Widget Ends */}
                {/* Footer Widget Starts */}
                <div className="col-sm-12 col-md-5">
                  {/* Facts Starts */}
                  <div className="facts-footer">
                    <div>
                      <h5>$198.76B</h5>
                      <span>Market cap</span>
                    </div>
                    <div>
                      <h5>243K</h5>
                      <span>daily transactions</span>
                    </div>
                    <div>
                      <h5>36K</h5>
                      <span>active accounts</span>
                    </div>
                    <div>
                      <h5>127</h5>
                      <span>supported countries</span>
                    </div>
                  </div>
                  {/* Facts Ends */}
                  <hr />
                </div>
                {/* Footer Widget Ends */}
              </div>
            </div>
          </div>
          {/* Footer Top Area Ends */}
          {/* Footer Bottom Area Starts */}
          <div className="bottom-footer">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  {/* Copyright Text Starts */}
                  <p className="text-center">
                    Copyright © 2018 {hostname} All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a href="#" id="back-to-top" className="back-to-top fa fa-arrow-up" />
      </div>
    </>
  );
}
