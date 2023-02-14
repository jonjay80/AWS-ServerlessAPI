import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="page-section clearfix">
        <div className="container">
          <div className="intro">
            <img
              className="intro-img img-fluid mb-3 mb-lg-0 rounded"
              src="/img/all-hands.jpg"
              alt="..."
            />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-upper">
                  Hello and Welcome!
                </span>
                <span className="section-heading-lower">Your Business</span>
              </h2>
              <p className="mb-3">
                We aim to cater to the diverse needs of our customers by
                providing a diverse range of offerings. We are known for our
                flexibility, adaptability, and ability to meet the changing
                demands of our customers. We strive to provide high-quality
                products and services at affordable prices, while prioritizing
                customer satisfaction and support. With a focus on innovation
                and efficiency, we work towards continuously improving our
                offerings and processes. Our goal is to be a one-stop solution
                for all the needs of our customers, making their lives easier
                and more convenient.
              </p>
              <div className="intro-button mx-auto">
                <Link
                  to="/services"
                  className="btn btn-primary btn-xl fs-6 p-3"
                >
                  Learn more...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section cta">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <div className="cta-inner bg-faded text-center rounded">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">Our Promise</span>
                  <span className="section-heading-lower">To You</span>
                </h2>
                <p className="mb-0">
                  We are dedicated to delivering the highest quality products
                  and services to meet all of your needs. Our commitment to
                  excellence is unwavering, and we are constantly striving to
                  improve our offerings to exceed your expectations. We
                  understand the trust you place in us, and we take that
                  responsibility seriously. Our team of experts is always
                  available to provide you with the support and assistance you
                  need, whether it's answering questions or resolving any issues
                  you may encounter. We promise to always be transparent and
                  honest in our dealings with you, and to never compromise on
                  the quality of our products or services. You are more than
                  just a customer, you are a valued member of our community. And
                  we promise to always treat you as such.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
