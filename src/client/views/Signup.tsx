export function Signup() {
  const signupSection = (
    <section className="light-page">
      <div className="my-container signup-page">
        <div className="header">
          <h1 className="main-heading-dark">
            join <span className="my-underline">the club</span>
          </h1>
          <h3 className="subtitle-h">become a member</h3>
          <p className="subtitle-p">sign your name into club history</p>
        </div>
        <form action="" method="post" className="sign-form">
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
          <button className="btn-primary">
            <i className="fa-solid fa-table-tennis-paddle-ball"></i>
            register your racket
          </button>
          <p className="caption">
            by joining, you swear on honor to compete fairly and uphold the
            spirit of ping pong.
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
        <footer>
          Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV Club
        </footer>
      </div>
    </section>
  );

  // Handle form submission
  const form = signupSection.querySelector("form");
  if (form) {
    form.addEventListener("submit", async (e: any) => {
      e.preventDefault();

      const username = signupSection.querySelector("#username").value;
      const email = signupSection.querySelector("#email").value;
      const password = signupSection.querySelector("#password").value;
      const confirmPassword =
        signupSection.querySelector("#confirm-password").value;

      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // Success
          console.log("Registered successfully:", result);
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
          location.hash = "home"; // switch later to signin
        } else {
          // Error backend
          alert(result.error || "Registration failed.");
        }
      } catch (err) {
        console.error("Error registering:", err);
        alert("Server error. Try again later.");
      }
    });
  }

  return signupSection;
}
