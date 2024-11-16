import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Refer from "../../components/Refer";
import Blog from "./Blog";

export default function Home() {
    return (
        <div className="min-h-screen" style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
        }}>
            <Header />
            <div className="pt-16"> {/* Adjust `pt-16` based on your header height */}
                <Blog />
            </div>
            <Refer/>
            <Footer />
        </div>
    );
}