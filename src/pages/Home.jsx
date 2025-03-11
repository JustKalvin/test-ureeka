import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FooterBg2 from "../assets/FooterBg2.png";
import HomeBg from "../assets/HomeBg.png";
import LogoMakanan from "../assets/LogoMakanan.png";
import {useState, useEffect} from "react"

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 position-relative" style={{backgroundColor: "#fcecdf" }}>
      {/* Navbar */}
      <Navbar className="sticky-top" selectedPage = "home"/>
      {/* Konten Utama */}
      <main className="flex-grow-1 position-relative" style={{ height: "2000px"}}>
        {/* Background Image sebagai wrapper */}
        <div
          className="position-relative w-100"
          style={{
            backgroundImage: `url(${HomeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            zIndex : 1
          }}
        >
          {/* Overlay untuk meningkatkan keterbacaan teks */}
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>

          {/* Teks di atas gambar */}
          <div className="container position-absolute top-50 start-0 translate-middle-y text-white text-start ms-5">
            <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>
              Selamat Datang!
            </h1>
            <p style={{ fontSize: "1.2rem", fontFamily: "Arial, sans-serif", textAlign: "left", maxWidth: "600px" }}>
              Setiap anak Indonesia berhak mendapatkan makanan bergizi melalui sistem yang transparan dan efisien. 
              Dengan sistem ini, pendaftaran sekolah menjadi lebih mudah, distribusi makanan lebih merata, 
              serta umpan balik dari masyarakat dapat digunakan untuk terus meningkatkan kualitas program.
            </p>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Home;
