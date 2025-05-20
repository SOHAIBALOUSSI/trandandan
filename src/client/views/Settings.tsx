import { LeftNavBar } from "@/components/layout/left-nav-bar";
import { TopNavBar } from "@/components/layout/top-nav-bar";

export function Settings() {
  const settingsSection = (
    <section className="dark-page">
      <LeftNavBar />
      <TopNavBar />
    </section>
  );
  return settingsSection;
}
