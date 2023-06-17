-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2023 at 09:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `balihalus_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `nama`) VALUES
('admin', 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=', 'asep_garut');

-- --------------------------------------------------------

--
-- Table structure for table `cabang`
--

CREATE TABLE `cabang` (
  `no_cabang` int(11) NOT NULL,
  `nama` varchar(32) NOT NULL,
  `alamat` varchar(64) NOT NULL,
  `id_kota` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gambar` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cabang`
--

INSERT INTO `cabang` (`no_cabang`, `nama`, `alamat`, `id_kota`, `username`, `gambar`) VALUES
(2, 'BaliHalus Denpasar Bali', 'Jalan Ngurah Rai No. 27', 2, 'admin', ''),
(5, 'BaliHalus Medan', 'Jalan Medan No. 7', 3, 'admin', ''),
(7, 'BaliHalus Dago', 'Jalan Ganesha No. 7', 4, 'admin', ''),
(10, 'Bali Halus Uber', 'jalan AH Nasution', 1, 'admin', 0x67616d626172436162616e672d313638363938343931323639372d363636323133383334);

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `id_kota` int(11) NOT NULL,
  `nama_kota` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`id_kota`, `nama_kota`) VALUES
(1, 'Bandung'),
(2, 'Denpasar'),
(3, 'Medan'),
(4, 'Surabaya');

-- --------------------------------------------------------

--
-- Table structure for table `layanan`
--

CREATE TABLE `layanan` (
  `id_layanan` int(11) NOT NULL,
  `harga` int(15) NOT NULL,
  `masker` varchar(50) DEFAULT NULL,
  `scrub` varchar(50) DEFAULT NULL,
  `oil` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `layanan`
--

INSERT INTO `layanan` (`id_layanan`, `harga`, `masker`, `scrub`, `oil`) VALUES
(5, 0, 'Strawberry', NULL, NULL),
(6, 0, NULL, 'Strawberry', NULL),
(7, 0, NULL, 'Coklat', NULL),
(8, 0, 'Sandalwood', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(64) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`username`, `password`, `nama`, `alamat`, `no_hp`, `status`) VALUES
('dustin123', 'yTime6HZWLia4fs1TAFBgVnTm/ajCZgyg1qsAqX7Ges=', 'Dustin', 'Jalan Batik Pekalongan No. 36', '085721556867', 1),
('gasta123', 'iyLwmf+fwn9br5Gm4QYlx+al7fXpmcUxZO8sQKilPaE=', 'Gasta', 'Jalan Ciumbuleuit No. 1', '085721556867', 1),
('irsyad123', 'mG5PRcAMbMS2YVJKnpN6WaBYBPxf7DHfdbfwsujgS10=', 'Irsyad', 'Jalan Bukit Jarian No. 6', '0813205728512', 1),
('jule123', 'Nt5jHImhHBrgTuVefyqfBEc+Ccu87d25L2wAcGsqn24=', 'Julaeha', 'Jalan Sukaakur No. 9', '089646436464', 1),
('member123', 'VgA3boY9L1egU1GPMkrThAsLwjSLVzrygae3y+eiKMY=', 'Member 1', 'Jalan Bukit Jarian No. 6', '089646436360', 1),
('mone12345', 'SV12di83wK1J3I3bZ6uQTrMsKIr6/hyTVrDLaYRAy0Y=', 'Moneeeee', 'Jalan Ciumbuleuit No. 1', '0813205728512', 1),
('ruben123', '86n32m3fuWapOQhYYBVC7/8alwnyHFgsZBfzW1BFu8o=', 'Ruben', 'Jalan Sukaakur No. 9', '089646436361', 1),
('ujang_asbes', 'EqQAKkDPePiS/0ianRoWYXYT7HVFh5nkUxQw69V0cPs=', 'Ujang Ismail', 'Jalan Singaparna', '081313131313', 1),
('upno123', 'HyRe9U1C/fxt1c+a71yTQLA0qmkQ7TkcZGOccYkaXuk=', 'Upno', 'Jalan Batik Pekalongan No. 36', '089646436360', 1),
('vin123', 'XdpwD4PJv6A2+phahVIkwbHOEwytyo+isAQipls6q60=', 'Vincent', 'Jalan Batik Pekalongan No. 36', '089646436360', 1),
('wildanrizkii', 'Hsh8VmOrr3Kj8msFfxYYbMEjPlmQZDhW/veBB4o9o+8=', 'Wildan Rizki Nurfauzi', 'Jalan Batik Pekalongan No. 36', '089646436360', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservasi`
--

CREATE TABLE `reservasi` (
  `no_reservasi` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_kedatangan` time NOT NULL,
  `no_cabang` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `id_layanan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `cabang`
--
ALTER TABLE `cabang`
  ADD PRIMARY KEY (`no_cabang`),
  ADD KEY `fk_kota` (`id_kota`),
  ADD KEY `fk_user_admin` (`username`);

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`id_kota`);

--
-- Indexes for table `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id_layanan`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`no_reservasi`),
  ADD KEY `fk_cabang` (`no_cabang`),
  ADD KEY `fk_user_member` (`username`),
  ADD KEY `fk_layanan` (`id_layanan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cabang`
--
ALTER TABLE `cabang`
  MODIFY `no_cabang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `id_kota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id_layanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `no_reservasi` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cabang`
--
ALTER TABLE `cabang`
  ADD CONSTRAINT `fk_kota` FOREIGN KEY (`id_kota`) REFERENCES `kota` (`id_kota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_admin` FOREIGN KEY (`username`) REFERENCES `admin` (`username`);

--
-- Constraints for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD CONSTRAINT `fk_cabang` FOREIGN KEY (`no_cabang`) REFERENCES `cabang` (`no_cabang`),
  ADD CONSTRAINT `fk_layanan` FOREIGN KEY (`id_layanan`) REFERENCES `layanan` (`id_layanan`),
  ADD CONSTRAINT `fk_user_member` FOREIGN KEY (`username`) REFERENCES `member` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
