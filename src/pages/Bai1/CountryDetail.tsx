import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface Country {
    name: { common: string; official: string };
    region: string;
    subregion: string;
    capital: string[];
    population: number;
    area: number;
    languages: { [key: string]: string };
    currencies: { [key: string]: { name: string; symbol: string } };
    flags: { png: string; svg: string };
}

export default function CountryDetail() {
    const { code } = useParams();
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCountry = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );
                setCountry(res.data[0]);
            } catch (err) {
                setError("Không tìm thấy thông tin quốc gia.");
            } finally {
                setLoading(false);
            }
        };
        fetchCountry();
    }, [code]);

    if (loading) return <p style={{ padding: 20 }}>Đang tải thông tin...</p>;
    if (error) return <p style={{ color: "red", padding: 20 }}>{error}</p>;
    if (!country) return null;

    // Lấy thông tin ngôn ngữ
    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "Không rõ";

    // Lấy thông tin tiền tệ
    const currencyKey = country.currencies
        ? Object.keys(country.currencies)[0]
        : "";
    const currencyInfo = currencyKey ? country.currencies[currencyKey] : null;

    return (
        <div style={{ padding: 20 }}>
            <h2>Chi tiết: {country.name.common}</h2>
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width={200}
                    style={{ borderRadius: 8 }}
                />
                <div>
                    <p>
                        <strong>Tên chính thức:</strong> {country.name.official}
                    </p>
                    <p>
                        <strong>Vùng:</strong> {country.region}
                    </p>
                    <p>
                        <strong>Vùng con (subregion):</strong> {country.subregion}
                    </p>
                    <p>
                        <strong>Thủ đô:</strong> {country.capital?.[0] || "Không rõ"}
                    </p>
                    <p>
                        <strong>Dân số:</strong> {country.population.toLocaleString()}
                    </p>
                    <p>
                        <strong>Diện tích:</strong> {country.area.toLocaleString()} km²
                    </p>
                    <p>
                        <strong>Ngôn ngữ:</strong> {languages}
                    </p>
                    <p>
                        <strong>Tiền tệ:</strong>{" "}
                        {currencyInfo
                            ? `${currencyInfo.name} (${currencyInfo.symbol})`
                            : "Không rõ"}
                    </p>
                    <Link to="/bai1">Quay lại</Link>
                </div>
            </div>
        </div>
    );
}
