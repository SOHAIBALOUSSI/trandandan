import { Footer } from "@/components/layout/footer";

function EnterTheClub() {
  const enterBtn = (
    <div className="signin-action">
      <button className="btn-primary" id="enter-btn">
        <i className="fa-solid fa-ticket"></i>
        Enter The Club
      </button>
      <p className="signin-action-quote">
        “Take your first step into the court”
      </p>
    </div>
  );

  const signinBtn = enterBtn.querySelector("#enter-btn");
  if (signinBtn) {
    signinBtn.addEventListener("click", () => {
      window.location.hash = "signin";
    });
  }

  return enterBtn;
}

function MainTitle() {
  return (
    <div className="main-title">
      <h1 className="main-title-header">Welcome to the bhv ping pong club</h1>
      <h3 className="main-title-subheader">
        Play like it’s 1901. Compete like a champion.
      </h3>
    </div>
  );
}

export function Welcome() {
  const welcomeSection = (
    <section className="light-page">
      <div className="my-container wlcm-page">
        <EnterTheClub />
        <MainTitle />
        <Footer />
      </div>
    </section>
  );

  return welcomeSection;
}
