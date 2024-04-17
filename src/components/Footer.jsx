import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        <strong>WideGlobe</strong> &copy; Copyright {new Date().getFullYear()}.
        Designed by{" "}
        <a
          href="https://github.com/bakna2t"
          target="_blank"
          rel="noopener noreferrer"
        >
          _&#216;k
        </a>
      </p>
    </footer>
  );
}

export default Footer;
