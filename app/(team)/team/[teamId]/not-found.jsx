import Link from "next/link";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Not found 404!</h1>
      <div style={styles.linkContainer}>
        <Link style={styles.link} href="/">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  linkContainer: {
    marginTop: "20px",
  },
  link: {
    fontSize: "16px",
    color: "blue",
    textDecoration: "underline",
  },
};
