import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navbar mb-5" style={{ backgroundColor: "#081e39" }}>
      <div className="container-fluid">
        <Link to="/">
          <img src="/logo.svg" alt="CoinMena" className="pt-2 pb-2" />
        </Link>

        <div>
          <p className="mb-0" style={{ color: "#fff" }}>
            Your personal companion to crypto currency exchange in the MENA
            region
          </p>
        </div>
      </div>
    </nav>
  );
}
