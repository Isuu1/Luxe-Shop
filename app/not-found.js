import Link from "next/link";
import "./not-found.scss";

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/" className="not-found-page__button">
        Return home
      </Link>
    </div>
  );
}
