import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="img-1.jpg" alt="Waterfall" className={styles.img} />
        <div>
          <h2>
            About <em>WideGlobe</em>.
          </h2>
          <p>
            This app allows users to search, mark and track their favorite
            cities on a global map, making it easy to visualize past and future
            destinations. With this feature, users can plan their trips
            efficiently and keep a record of places they have visited. The app
            offers a convenient way to create personalized itineraries and share
            travel experiences with others.
          </p>
          <p>
            By providing a visual representetion of their journeys, users can
            reminisce about past adventures and get inspired for new ones.
            Ultimately, the app enhances the travel experience by allowing users
            to map out their global adventures in a user-friendly and
            interactive way.
          </p>
        </div>
      </section>
    </main>
  );
}
