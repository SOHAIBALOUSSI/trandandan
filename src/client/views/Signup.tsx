import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { handleSignUp } from "@/services/handle-signup";
import { MainHeader } from "@/components/common/MainHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";
import {
  handleGoogleSignin,
  handle42Signin,
} from "@/services/handle-remote-signin";

export function Signup() {
  setTimeout(() => {
    handleSignUp();
    handleGoogleSignin();
    handle42Signin();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <MainHeader
        isDark={true}
        title={"Join"}
        titleSpan={"The Club"}
        subtitle={"become a member"}
        subtitleParagraph={"sign your name into club history"}
      />
      <SignUpForm />
      <Footer />
    </section>
  );
}
