import { Footer } from "@/components/common/footer";

export function Welcome() {
  const welcomeSection = (
    <section className="light-page">
      <div className="my-container wlcm-page">
        <div className="signin-action">
          <button className="btn-primary" id="enter-btn">
            <i className="fa-solid fa-ticket"></i>
            Enter The Club
          </button>
          <p className="signin-action-quote">
            “Take your first step into the court”
          </p>
        </div>
        <div className="main-title">
          <h1 className="main-title-header">
            Welcome to the bhv ping pong club
          </h1>
          <h3 className="main-title-subheader">
            Play like it’s 1901. Compete like a champion.
          </h3>
        </div>
        <Footer />
      </div>
    </section>
  );

  const signinBtn = welcomeSection.querySelector("#enter-btn");
  if (signinBtn) {
    signinBtn.addEventListener("click", () => {
      window.location.hash = "signin";
    });
  }

  return welcomeSection;
}
