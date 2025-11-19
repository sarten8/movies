import Image from "next/image";

export default function Home() {
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div style={styles.content}>
          <h1 style={styles.title}>
            To get started, edit the page.tsx file.
          </h1>
          <p style={styles.description}>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js"
              style={styles.link}
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn"
              style={styles.link}
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div style={styles.buttons}>
          <a
            style={styles.primaryButton}
            href="https://vercel.com/new?utm_source=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            style={styles.secondaryButton}
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    fontFamily: "sans-serif",
  },
  main: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "48rem",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8rem 4rem",
    backgroundColor: "#ffffff",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    textAlign: "center",
  },
  title: {
    maxWidth: "20rem",
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: "2.5rem",
    letterSpacing: "-0.025em",
    color: "#000000",
    margin: 0,
  },
  description: {
    maxWidth: "28rem",
    fontSize: "1.125rem",
    lineHeight: "2rem",
    color: "#52525b",
    margin: 0,
  },
  link: {
    fontWeight: 500,
    color: "#09090b",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "1rem",
    fontWeight: 500,
  },
  primaryButton: {
    display: "flex",
    height: "3rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: "9999px",
    backgroundColor: "#000000",
    padding: "0 1.25rem",
    color: "#ffffff",
    transition: "background-color 0.2s",
    textDecoration: "none",
  },
  secondaryButton: {
    display: "flex",
    height: "3rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "0 1.25rem",
    transition: "all 0.2s",
    textDecoration: "none",
    color: "#000000",
  },
};
