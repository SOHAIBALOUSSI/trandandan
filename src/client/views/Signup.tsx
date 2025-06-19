import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { handleSignUp } from "@/handlers/handle-signup";
import { MainHeader } from "@/components/common/MainHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Overlay } from "@/components/layout/Overlay";
import {
  handleGoogleSignin,
  handle42Signin,
} from "@/handlers/handle-remote-signin";

export function Signup() {
  setTimeout(() => {
    handleSignUp();
    handleGoogleSignin();
    handle42Signin();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <MainHeader
        isDark={true}
        title="join"
        titleSpan="the club"
        subtitle="become a member"
        subtitleParagraph="sign your name into club history"
      />
      <SignUpForm />
      <Footer />
    </section>
  );
}
