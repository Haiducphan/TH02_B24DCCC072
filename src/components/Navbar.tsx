import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
            <Link to="/bai1" style={{ marginRight: "10px" }}>Bài 1</Link>
            <Link to="/bai2" style={{ marginRight: "10px" }}>Bài 2</Link>
            <Link to="/bai3">Bài 3</Link>
        </nav>
    );
}
