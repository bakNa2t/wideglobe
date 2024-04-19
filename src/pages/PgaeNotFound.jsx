import PageNav from "../components/PageNav";

import styles from "./PgaeNotFound.module.css";

function PgaeNotFound() {
  return (
    <main className={styles.main}>
      <PageNav />
      <h1>
        Page Not Found <span> ☹</span>
      </h1>
    </main>
  );
}

export default PgaeNotFound;
