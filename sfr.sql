-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: יוני 21, 2026 בזמן 10:06 PM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sern_apps_workers`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `entrances_and_exits`
--

CREATE TABLE `entrances_and_exits` (
  `id` int(11) NOT NULL,
  `tz` varchar(9) NOT NULL,
  `action_type` enum('check_in','check_out') NOT NULL,
  `log_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `entrances_and_exits`
--

INSERT INTO `entrances_and_exits` (`id`, `tz`, `action_type`, `log_time`) VALUES
(1, '314813379', 'check_in', '2026-06-18 13:52:56'),
(2, '314813379', 'check_out', '2026-06-18 13:53:19'),
(3, '314813379', 'check_in', '2026-06-18 14:07:27'),
(4, '314813379', 'check_out', '2026-06-19 11:00:32'),
(5, '314813379', 'check_in', '2026-06-19 11:10:36'),
(6, '314813379', 'check_out', '2026-06-19 11:16:50'),
(7, '314813379', 'check_in', '2026-06-19 11:17:13'),
(8, '314813379', 'check_out', '2026-06-19 11:31:39'),
(9, '314813379', 'check_in', '2026-06-21 01:11:57'),
(10, '314813379', 'check_in', '2026-06-21 01:12:21'),
(11, '314813379', 'check_out', '2026-06-21 01:12:35');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `entrances_and_exits`
--
ALTER TABLE `entrances_and_exits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entrances_and_exits`
--
ALTER TABLE `entrances_and_exits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
