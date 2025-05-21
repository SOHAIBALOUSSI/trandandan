import { Footer } from "@/components/layout/footer";
import { handleSignIN } from "@/services/handle-signin";

function Header() {
  const header = (
    <div className="header">
      <h1 className="main-heading-dark">
        welcome back, <span className="my-underline">champion</span>
      </h1>
      <h3 className="subtitle-h">step into the club</h3>
      <p className="subtitle-p">
        enter your credentials to continue your legacy.
      </p>
    </div>
  );

  return header;
}

function Form() {
  const form = (
    <div className="signin-form relative">
      <form action="" method="post" className="sign-form" id="signin-form">
        <input
          type="text"
          name="login"
          className="input-field"
          id="login"
          placeholder="username or email"
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="on"
          className="input-field"
          id="password"
          placeholder="password"
          required
        />
        <div id="signin-feedback" className="form-message"></div>
        <button type="submit" className="btn-primary btn-bottom">
          <i className="fa-solid fa-couch"></i>
          enter the lounge
        </button>

        <a href="#" className="lost-pass" data-link>
          lost your paddle?
        </a>
        <div className="link">
          <p className="link-p">
            new here?{" "}
            <a href="signup" className="link-a" data-link>
              join the club and make history.
            </a>
          </p>
        </div>
        <div className="line">
          <i className="fa-solid fa-table-tennis-paddle-ball"></i>
        </div>
      </form>
      <div className="remote-signin">
        <button type="button" className="btn-primary">
          <i className="fa-solid fa-couch"></i>
          enter with google
        </button>
        <button className="btn-primary">
          <i className="fa-solid fa-couch"></i>
          enter with 42
        </button>
      </div>
    </div>
  );

  return form;
}

export function Signin() {
  setTimeout(() => {
    console.log("Signin component mounted");
    handleSignIN();
  }, 0);

  const signinSection = (
    <section className="light-page">
      <div className="my-container signin-page">
        <Header />
        <Form />
        <Footer />
      </div>
    </section>
  );

  return signinSection;
}
