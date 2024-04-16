import { Link } from "react-router-dom";
import styles from "./Mainpage.module.css";
import PageNave from "../components/PageNav";

export default function Mainpage() {
  return (
    <main className={styles.main}>
      <PageNave />
      <section>
        <h1>
          Travel and explore the whole world with <em>WideGlobe</em>
          <br />
          App can plan, track, mark and keep your exciting and memorable
          adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Let&#39;s started tracking
        </Link>
      </section>
    </main>
  );
}
