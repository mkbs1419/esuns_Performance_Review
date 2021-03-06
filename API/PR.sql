-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 05 月 28 日 06:18
-- 伺服器版本: 10.1.31-MariaDB
-- PHP 版本： 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `esuns_performance_bonus`
--

-- --------------------------------------------------------

--
-- 資料表結構 `employeeinfo`
--

CREATE TABLE `employeeinfo` (
  `_id` int(11) NOT NULL,
  `employeeId` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號',
  `employeeName` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '員工姓名',
  `employeeGroup` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '事業群',
  `employeeDepartment` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '部門別',
  `employeeLevel` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '職等職級',
  `employeeTitle` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '職務名稱',
  `arriveDate` date DEFAULT NULL COMMENT '到職日期',
  `regularDate` date DEFAULT NULL COMMENT '轉正日期',
  `form1Status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '填表狀態1',
  `form2Status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '填表狀態2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- 資料表的匯出資料 `employeeinfo`
--

INSERT INTO `employeeinfo` (`_id`, `employeeId`, `employeeName`, `employeeGroup`, `employeeDepartment`, `employeeLevel`, `employeeTitle`, `arriveDate`, `regularDate`, `form1Status`, `form2Status`) VALUES
(1, 'testProfile_A', '受評人員A', '工程事業群', '宗陽', '2等8級', '工程師', '2017-01-01', '2017-04-01', 0, 0),
(2, 'testProfile_B', '受評人員B', '工程事業群', '宗陽', '3等6級', '工程師', '2017-04-01', '2017-07-01', 0, 0),
(3, 'testProfile_C', '受評人員C', '工程事業群', '宗陽', '2等5級', '工程師', '2018-02-01', '2018-05-01', 0, 0),
(4, 'testProfile_D', '受評人員D', '工程事業群', '宗陽', '3等7級', '工程師', '2017-05-01', '2018-08-01', 0, 0),
(5, 'testProfile_X', '受評人員X', '工程事業群', '宗陽', '4等1級', '工程師', '2017-05-01', '2018-08-01', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `form1`
--

CREATE TABLE `form1` (
  `_id` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號:	專案名稱:季度',
  `employeeId` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號',
  `projectName` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '專案名稱',
  `quarter` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '季度',
  `reviewDate` date DEFAULT NULL COMMENT '考核日期',
  `q1Score` int(11) NOT NULL DEFAULT '0',
  `q2Score` int(11) NOT NULL DEFAULT '0',
  `q3Score` int(11) NOT NULL DEFAULT '0',
  `q4Score` int(11) NOT NULL DEFAULT '0',
  `q5Score` int(11) NOT NULL DEFAULT '0',
  `q6Score` int(11) NOT NULL DEFAULT '0',
  `q7Score` int(11) DEFAULT '0',
  `q8Score` int(11) NOT NULL DEFAULT '0',
  `q9Score` int(11) NOT NULL DEFAULT '0',
  `result` int(11) NOT NULL DEFAULT '0' COMMENT '總分',
  `description` varchar(10) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '評等',
  `badPerformance` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '考績丙等處置',
  `note` varchar(300) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '備註'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `form2`
--

CREATE TABLE `form2` (
  `_id` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '	員工帳號:	專案名稱:季度	',
  `projectName` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '專案名稱',
  `quarter` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '季度',
  `reviewDate` date DEFAULT NULL COMMENT '考核日期',
  `employeeId` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號',
  `orderList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL,
  `scoreList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL,
  `totalList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `projectinfo`
--

CREATE TABLE `projectinfo` (
  `_id` int(11) NOT NULL,
  `projectName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL COMMENT '專案名稱',
  `exceptValue` int(11) NOT NULL COMMENT '預計發放金額',
  `quarter` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '季度',
  `actualMoney` int(11) NOT NULL DEFAULT '0' COMMENT '實際發放季獎金',
  `accumulation` int(11) NOT NULL DEFAULT '0' COMMENT '累計發放季獎金',
  `fillingPerson` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '	評核人員',
  `password` varchar(10) DEFAULT NULL COMMENT '登入密碼',
  `testList` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '受評人員名單'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `projectinfo`
--

INSERT INTO `projectinfo` (`_id`, `projectName`, `exceptValue`, `quarter`, `actualMoney`, `accumulation`, `fillingPerson`, `password`, `testList`) VALUES
(1, '專案一', 10000, 'Q1', 0, 0, '評核人員X1', '1111', 'testProfile_A,testProfile_B,testProfile_X'),
(2, '專案二', 20000, 'Q2', 0, 0, '評核人員X2', '2222', 'testProfile_C,testProfile_D');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `employeeinfo`
--
ALTER TABLE `employeeinfo`
  ADD PRIMARY KEY (`_id`);

--
-- 資料表索引 `form1`
--
ALTER TABLE `form1`
  ADD PRIMARY KEY (`_id`);

--
-- 資料表索引 `form2`
--
ALTER TABLE `form2`
  ADD PRIMARY KEY (`_id`);

--
-- 資料表索引 `projectinfo`
--
ALTER TABLE `projectinfo`
  ADD PRIMARY KEY (`_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `employeeinfo`
--
ALTER TABLE `employeeinfo`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表 AUTO_INCREMENT `projectinfo`
--
ALTER TABLE `projectinfo`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
