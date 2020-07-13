import React from "react";
import NavigationBar from "./NavigationBar";

export default function Base({
  title = "My Title",
  description = "desc",
  className = " text-white p-4",
  children,
}) {
  return (
    <div>
      <NavigationBar />
      <div className="cotainer-fluid  ">
        <div className="jumbotron baseColor text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>

      <div class="container-fluid justify-content-center p-0 mx-0 baseColor">
        <footer>
          <div class="row mb-0 mt-4 mx-4 row-2 justify-content-xl-around justify-content-sm-between">
            <div class="col-xs-6 pt-4 px-3">
              <ul class="list-unstyled text-white">
                <li class="mt-md-0 text-secondary text-white">Help</li>
                <li>Your Account</li>
                <li>Payments</li>
                <li>Refund</li>
                <li>Cancellation</li>
                <li>Shipping</li>
                <li>FAQ</li>
                <li>Report</li>
              </ul>
            </div>

            <div class="col-xs-6 pt-4 px-3">
              <ul class="list-unstyled text-white">
                <li class="mt-md-0 text-secondary">ABOUT</li>
                <li>Contact Us</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>ShopperSpace Stories</li>
              </ul>
            </div>

            <div class="col-xs-6 pt-4 px-3">
              <ul class="list-unstyled text-white">
                <li class="mt-md-0 text-secondary">policy</li>
                <li>Return Policy</li>
                <li>Terms Of Use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div class="col-xs-6 pt-4 px-3">
              <ul class="list-unstyled text-white">
                <li class="mt-md-0 text-secondary">social</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>YouTube</li>
                <li>Instagram</li>
                <li>Linkedin</li>
              </ul>
            </div>

            <div class="col-xl-auto text-left col-lg-4 col-md-4 col-sm-6 col-12 pt-4 my-sm-0 order-6 my-auto">
              <div class="input-group-lg input-group mb-3 mt-md-0 mt-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="E-mail address"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button class="btn orange" type="button" id="button-addon2">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-lg-around mx-xl-5 mx-lg-4 mx-3 py-3">
            <div class="col order-1 align-self-center">
              <p class="mb-0 text-uppercase">
                we're accountable for seven days a week, 24 hours a day
              </p>
              <small>
                Contact Number : 789-421-3600 <br />
                Email Address:Support@Threads.com
              </small>
            </div>
          </div>

          <div class="row text-center py-3">
            <div class="col text-secondary">
              <div href="/shop/">Treads</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
