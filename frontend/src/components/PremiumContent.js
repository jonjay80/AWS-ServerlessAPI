import React from "react";
import { getUser } from "../service/AuthService";

const PremiumContent = () => {
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";
  return (
    <div>
      <section className="page-section about-heading">
        <div className="container">
          <div className="about-heading-content">
            <div className="row">
              <div className="col-xl-9 col-lg-10 mx-auto">
                <div className="bg-faded rounded p-5">
                  <h2 className="section-heading mb-4">
                    <span className="section-heading-upper">Hello {name}!</span>
                    <span className="section-heading-lower">
                      Premium Content
                    </span>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum at ante interdum, laoreet orci sed, ornare arcu.
                    Donec auctor, diam tempor tristique maximus, elit massa
                    consectetur enim, quis congue ipsum mauris vitae erat.
                    Mauris ullamcorper commodo nunc, vitae accumsan metus
                    dapibus non. Sed faucibus libero magna, vitae commodo dolor
                    scelerisque ut. Donec convallis efficitur ante, vitae
                    vulputate turpis consequat id. Fusce eu velit volutpat neque
                    sodales gravida a vitae nibh. Vestibulum lacus mauris,
                    volutpat vel imperdiet id, scelerisque id augue. Morbi a sem
                    eu mi faucibus vestibulum. Donec gravida ante odio, eget
                    aliquam mi gravida eget. Nunc et orci vel lacus rutrum
                    gravida. Suspendisse posuere risus at pellentesque
                    vulputate. Duis condimentum massa et magna lacinia
                    fringilla. Sed vel diam eros. Nam elementum ex a ante
                    elementum imperdiet. Proin egestas sem rutrum augue feugiat
                    semper. Donec dictum mattis ligula sit amet molestie. Duis
                    ultrices, elit ut elementum varius, velit ante aliquet
                    nulla, a fringilla risus lectus a mi. Praesent diam elit,
                    sollicitudin vel commodo eget, eleifend rhoncus neque. In
                    sollicitudin semper orci, vel sagittis ipsum interdum quis.
                    Duis euismod luctus lorem ut luctus. Cras eu est diam. In id
                    quam eget ligula eleifend semper vel at nibh. Cras hendrerit
                    lacus at tellus maximus, id pulvinar risus efficitur.
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

export default PremiumContent;
