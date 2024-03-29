-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2023 at 09:29 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

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
-- Table structure for table `body_massage`
--

CREATE TABLE `body_massage` (
  `id_bm` int(11) NOT NULL,
  `oil` varchar(50) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `body_massage`
--

INSERT INTO `body_massage` (`id_bm`, `oil`, `harga`) VALUES
(1, 'Rose', 150000),
(2, 'Jasmine', 150000),
(3, 'Sandalwood', 150000),
(4, 'Lemongrass', 150000),
(5, 'Lavender', 150000),
(6, 'Frangipani', 150000);

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
(7, 'BaliHalus Dago', 'Jalan Ganesha No. 7', 1, 'admin', ''),
(10, 'Bali Halus Uber', 'Jalan AH Nasution', 1, 'admin', 0x67616d626172436162616e672d313638363938343931323639372d363636323133383334),
(11, 'BaliHalus Surabaya', 'Jalan Raya Surabaya No. 4', 4, 'admin', 0x67616d626172436162616e672d313638373131353635323133332e6a7067);

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
-- Table structure for table `refleksi`
--

CREATE TABLE `refleksi` (
  `id_ref` int(11) NOT NULL,
  `harga` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refleksi`
--

INSERT INTO `refleksi` (`id_ref`, `harga`) VALUES
(1, 100000),
(2, 100000);

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
  `id_spaM` int(11) DEFAULT NULL,
  `id_spaS` int(11) DEFAULT NULL,
  `id_bm` int(11) DEFAULT NULL,
  `id_ref` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservasi`
--

INSERT INTO `reservasi` (`no_reservasi`, `tanggal`, `waktu_kedatangan`, `no_cabang`, `username`, `id_spaM`, `id_spaS`, `id_bm`, `id_ref`) VALUES
(4, '2023-06-30', '15:30:00', 7, 'wildanrizkii', 5, 1, NULL, NULL),
(5, '2023-08-07', '13:00:00', 10, 'wildanrizkii', NULL, NULL, 4, NULL),
(6, '2023-10-11', '16:00:00', 7, 'wildanrizkii', NULL, NULL, NULL, 1),
(7, '2023-12-06', '12:00:00', 10, 'gasta123', 3, 8, NULL, NULL),
(17, '2023-06-21', '11:04:00', 10, 'gasta123', NULL, NULL, NULL, 1),
(19, '2023-06-20', '17:00:00', 10, 'gasta123', 3, 6, NULL, NULL),
(20, '2023-06-23', '21:10:00', 10, 'gasta123', NULL, NULL, 4, NULL),
(21, '2023-06-20', '09:12:00', 5, 'gasta123', 2, 2, NULL, NULL),
(22, '2023-09-20', '11:15:00', 7, 'wildanrizkii', NULL, NULL, 5, NULL),
(23, '2023-06-30', '12:10:00', 5, 'wildanrizkii', NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spa_masker`
--

CREATE TABLE `spa_masker` (
  `id_spaM` int(11) NOT NULL,
  `nama_masker` varchar(50) NOT NULL,
  `harga` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spa_masker`
--

INSERT INTO `spa_masker` (`id_spaM`, `nama_masker`, `harga`) VALUES
(1, 'Coklat', 100000),
(2, 'Kopi', 100000),
(3, 'Alpukat', 100000),
(5, 'Strawberry', 100000),
(6, 'Milk', 100000),
(7, 'Boreh', 100000),
(8, 'Sandalwood', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `spa_scrub`
--

CREATE TABLE `spa_scrub` (
  `id_spaS` int(11) NOT NULL,
  `nama_scrub` varchar(50) NOT NULL,
  `harga` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spa_scrub`
--

INSERT INTO `spa_scrub` (`id_spaS`, `nama_scrub`, `harga`) VALUES
(1, 'Coklat', 100000),
(2, 'Sandalwood', 100000),
(3, 'Alpukat', 100000),
(6, 'Strawberry', 100000),
(7, 'Milk', 100000),
(8, 'Kopi', 100000),
(9, 'Boreh', 100000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `body_massage`
--
ALTER TABLE `body_massage`
  ADD PRIMARY KEY (`id_bm`);

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
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `refleksi`
--
ALTER TABLE `refleksi`
  ADD PRIMARY KEY (`id_ref`);

--
-- Indexes for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`no_reservasi`),
  ADD KEY `fk_cabang` (`no_cabang`),
  ADD KEY `fk_user_member` (`username`),
  ADD KEY `fk_spaM` (`id_spaM`),
  ADD KEY `fk_spaS` (`id_spaS`),
  ADD KEY `fk_ref` (`id_ref`),
  ADD KEY `fk_bm` (`id_bm`);

--
-- Indexes for table `spa_masker`
--
ALTER TABLE `spa_masker`
  ADD PRIMARY KEY (`id_spaM`);

--
-- Indexes for table `spa_scrub`
--
ALTER TABLE `spa_scrub`
  ADD PRIMARY KEY (`id_spaS`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `body_massage`
--
ALTER TABLE `body_massage`
  MODIFY `id_bm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cabang`
--
ALTER TABLE `cabang`
  MODIFY `no_cabang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `id_kota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `refleksi`
--
ALTER TABLE `refleksi`
  MODIFY `id_ref` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `no_reservasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `spa_masker`
--
ALTER TABLE `spa_masker`
  MODIFY `id_spaM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `spa_scrub`
--
ALTER TABLE `spa_scrub`
  MODIFY `id_spaS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  ADD CONSTRAINT `fk_bm` FOREIGN KEY (`id_bm`) REFERENCES `body_massage` (`id_bm`),
  ADD CONSTRAINT `fk_cabang` FOREIGN KEY (`no_cabang`) REFERENCES `cabang` (`no_cabang`),
  ADD CONSTRAINT `fk_ref` FOREIGN KEY (`id_ref`) REFERENCES `refleksi` (`id_ref`),
  ADD CONSTRAINT `fk_spaM` FOREIGN KEY (`id_spaM`) REFERENCES `spa_masker` (`id_spaM`),
  ADD CONSTRAINT `fk_spaS` FOREIGN KEY (`id_spaS`) REFERENCES `spa_scrub` (`id_spaS`),
  ADD CONSTRAINT `fk_user_member` FOREIGN KEY (`username`) REFERENCES `member` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
