import React from "react";

const About = () => {
  return (
    <div>
      <section className="page-section about-heading">
        <div className="container">
          <img
            className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
            src="/img/about-us.jpg"
            alt="..."
          />
          <div className="about-heading-content">
            <div className="row">
              <div className="col-xl-9 col-lg-10 mx-auto">
                <div className="bg-faded rounded p-5">
                  <h2 className="section-heading mb-4">
                    <span className="section-heading-upper">
                      Strong Brand, Strong Roots
                    </span>
                    <span className="section-heading-lower">
                      About Our Business
                    </span>
                  </h2>
                  <p>
                    As a small business, we play a vital role in local
                    communities and economies by providing jobs, generating
                    income, and supporting local suppliers and services. We are
                    owned and operated by a small team of individuals who are
                    passionate about our products and services. As a small
                    business, we are known for our agility, flexibility, and
                    ability to quickly adapt to changing market conditions and
                    customer demands. We have a close relationship with
                    customers and the personalized services we provide. We are
                    dedicated to providing high-quality products and services,
                    while building strong relationships with our customers and
                    community. Our goal is to make a positive impact on the
                    lives of those we serve and to contribute to the growth and
                    success of our local community. We believe that by focusing
                    on our customers and delivering exceptional service, we can
                    achieve success and grow our business for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
