import { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import LogoMakanan from "../assets/LogoMakanan.png";
import {motion} from "framer-motion"

function Verifikasi() {
  const [schoolData, setSchoolData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [npsn, setNpsn] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    setSchoolData(schoolData => (null))
    setIsVerified(isVerified => (null))
    setNpsn(npsn => (""))
    setIsLoading(isLoading => (false))
  }

  const handleNpsnVerification = async (e) => {
    e.preventDefault();
    if (!npsn.trim()) {
      alert("Harap masukkan NPSN terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`https://api-sekolah-indonesia.vercel.app/sekolah?npsn=${npsn.trim()}`);
      if (response.data.total_data > 0) {
        const schoolInfo = response.data.dataSekolah[0];
        setSchoolData({
          schoolName: schoolInfo.sekolah,
          npsn: schoolInfo.npsn,
          educationLevel: schoolInfo.bentuk,
          address: schoolInfo.alamat_jalan,
          gpsCoordinates: `${schoolInfo.lintang},${schoolInfo.bujur}`,
          studentCount: "",
        });
      } else {
        alert("NPSN tidak ditemukan. Pastikan NPSN yang dimasukkan benar.");
      }
    } catch (error) {
      console.error("Error verifikasi NPSN:", error);
      alert("Gagal mengambil data sekolah. Coba lagi nanti.");
    }
    setIsLoading(false);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const studentCount = parseInt(e.target.studentCount.value.trim(), 10);
    if (!studentCount) {
      alert("Harap isi jumlah siswa!");
      return;
    }

    const schoolPayload = {
      schoolName: schoolData.schoolName,
      npsn: schoolData.npsn,
      educationLevel: schoolData.educationLevel,
      address: schoolData.address,
      gpsCoordinates: schoolData.gpsCoordinates,
      studentCount: studentCount,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/add-school", schoolPayload);
      console.log("Sekolah berhasil ditambahkan:", response.data);
      setIsVerified(true);
    } catch (error) {
      console.error("Error menambahkan sekolah:", error);
      alert("Gagal menambahkan sekolah. Coba lagi.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor: "#fcecdf"}}>
      <Navbar selectedPage = "register"/>
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start mt-5 py-5" style={{ height: "700px" }}>
        {!schoolData ? (
          <form onSubmit={handleNpsnVerification} className="card p-4 shadow-lg w-50">
            <h2 className="text-center mb-4">Verifikasi NPSN</h2>
            <div className="mb-3">
              <label className="form-label">Masukkan NPSN</label>
              <input
                type="text"
                className="form-control"
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary w-100" disabled={isLoading}>
              {isLoading ? "Memverifikasi..." : "Cek Sekolah"}
            </button>
          </form>
        ) : !isVerified ? (
          <form onSubmit={handleVerification} className="card p-4 shadow-lg w-50 my-5">
            <h2 className="text-center mb-4">Verifikasi Sekolah</h2>
            <ul className="list-group mb-3">
              <li className="list-group-item">Nama Sekolah: {schoolData.schoolName}</li>
              <li className="list-group-item">NPSN: {schoolData.npsn}</li>
              <li className="list-group-item">Jenjang: {schoolData.educationLevel}</li>
              <li className="list-group-item">Alamat: {schoolData.address}</li>
            </ul>
            <div className="mb-3">
              <label className="form-label">Jumlah Siswa</label>
              <input type="number" name="studentCount" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-outline-primary w-100">Verifikasi</button>
          </form>
        ) : (
          <div className="card p-4 shadow-lg w-50 mt-4">
            <h3 className="text-center">Sekolah Terverifikasi</h3>
            <ul className="list-group">
              <li className="list-group-item">Nama Sekolah: {schoolData.schoolName}</li>
              <li className="list-group-item">NPSN: {schoolData.npsn}</li>
              <li className="list-group-item">Jenjang: {schoolData.educationLevel}</li>
              <li className="list-group-item">Alamat: {schoolData.address}</li>
            </ul>
            <motion.button
              onClick={() => handleBack()}
              className="w-25 mx-auto d-block mt-5 btn btn-danger"
              style={{ backgroundColor: "#9e122c" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Kembali
            </motion.button>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default Verifikasi;
