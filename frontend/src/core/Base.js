import React from "react";
import NavigationBar from "./NavigationBar";

export default function Base({className = " text-white p-4", children}) {
  return (
    <div>
      <NavigationBar />
      <div className="cotainer-fluid  mt-5 mb-5">
        <div className={className}>{children}</div>
      </div>

      <div className="container-fluid justify-content-center p-0 mx-0 baseColor">
        <footer>
          <div className="row mb-0 mt-4 mx-4 row-2 justify-content-xl-around justify-content-sm-between">
            <div className="col-xs-6 pt-4 px-3">
              <ul className="list-unstyled text-white">
                <li className="mt-md-0 text-secondary ">HELP</li>
                <li>Your Account</li>
                <li>Payments</li>
                <li>Refund</li>
                <li>Cancellation</li>
                <li>Shipping</li>
                <li>FAQ</li>
                <li>Report</li>
              </ul>
            </div>

            <div className="col-xs-6 pt-4 px-3">
              <ul className="list-unstyled text-white">
                <li className="mt-md-0 text-secondary">ABOUT</li>
                <li>Contact Us</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>ShopperSpace Stories</li>
              </ul>
            </div>

            <div className="col-xs-6 pt-4 px-3">
              <ul className="list-unstyled text-white">
                <li className="mt-md-0 text-secondary">POLICY</li>
                <li>Return Policy</li>
                <li>Terms Of Use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div className="col-xs-6 pt-4 px-3">
              <ul className="list-unstyled text-white">
                <li className="mt-md-0 text-secondary">SOCIAL</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>YouTube</li>
                <li>Instagram</li>
                <li>Linkedin</li>
              </ul>
            </div>
          </div>

          <div className="row justify-content-lg-around mx-xl-5 mx-lg-4 mx-3 py-3">
            <div className="col order-1 align-self-center text-secondary">
              <p className="mb-0 text-uppercase">
                we're accountable for seven days a week, 24 hours a day
              </p>
              <small>
                Contact Number : 789-421-3600 <br />
                Email Address:Support@Threads.com
              </small>
            </div>
          </div>

          <div className="row text-center py-3">
            <div className="col text-secondary">
              <div href="/shop/" style={{fontFamily: "Satisfy", fontSize: 30}}>
                Threads
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
