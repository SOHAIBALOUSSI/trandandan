import { Footer } from "@/components/layout/footer";
import { handleSignUp } from "@/services/handle-signup";

function Header() {
  const header = (
    <div className="header">
      <h1 className="main-heading-dark">
        join <span className="my-underline">the club</span>
      </h1>
      <h3 className="subtitle-h">become a member</h3>
      <p className="subtitle-p">sign your name into club history</p>
    </div>
  );

  return header;
}

function From() {
  const form = (
    <form action="" method="post" className="sign-form" id="signup-form">
      <input
        type="text"
        name="username"
        id="username"
        className="input-field"
        placeholder="enter your username"
        required
      />
      <input
        type="email"
        name="email"
        id="email"
        className="input-field"
        placeholder="enter your email"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        className="input-field"
        placeholder="enter your password"
        required
      />
      <input
        type="password"
        name="password"
        id="confirm-password"
        className="input-field"
        placeholder="confirm your password"
        required
      />
      <button type="submit" className="btn-primary">
        <i className="fa-solid fa-table-tennis-paddle-ball"></i>
        register your racket
      </button>
      <p className="caption">
        by joining, you swear on honor to compete fairly and uphold the spirit
        of ping pong.
      </p>
      <div className="link">
        <p className="link-p">
          Already hold a racket?{" "}
          <a href="#signin" className="link-a">
            Sign in here.
          </a>
        </p>
      </div>
    </form>
  );

  return form;
}

export function Signup() {
  setTimeout(() => {
    handleSignUp();
  }, 0);

  const signupSection = (
    <section className="light-page">
      <div className="my-container signup-page">
        <Header />
        <From />
        <Footer />
      </div>
    </section>
  );

  return signupSection;
}
