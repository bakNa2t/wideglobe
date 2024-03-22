import styles from "./User.module.css";

const FAKE_USER = {
  name: "Jorda",
  email: "jorda@mail.com",
  password: "112233",
  avatar: "https://i.pravatar.cc/100?u=az",
};

function User() {
  const user = FAKE_USER;

  function handleClick() {}

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
