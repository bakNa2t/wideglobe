import { Link } from "react-router-dom";
import styles from "./Mainpage.module.css";
import PageNave from "../components/PageNav";

export default function Mainpage() {
  return (
    <main className={styles.main}>
      <PageNave />
      <section>
        <h1>
          You travel the world.
          <br />
          <em>WideGlobe</em> keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/app" className="cta">
          Get started to WideGlobe tracking
        </Link>
      </section>
    </main>
  );
}