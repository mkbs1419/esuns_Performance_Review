-- MySQL dump 10.16  Distrib 10.1.28-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: esuns_performance_bonus
-- ------------------------------------------------------
-- Server version	10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employeeinfo`
--

DROP TABLE IF EXISTS `employeeinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employeeinfo` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號',
  `employeeName` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '員工姓名',
  `employeeGroup` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '事業群',
  `employeeDepartment` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '部門別',
  `employeeLevel` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '職等職級',
  `employeeTitle` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '職務名稱',
  `arriveDate` date DEFAULT NULL COMMENT '到職日期',
  `regularDate` date DEFAULT NULL COMMENT '轉正日期',
  `form1Status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '填表狀態1',
  `form2Status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '填表狀態2',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeinfo`
--

LOCK TABLES `employeeinfo` WRITE;
/*!40000 ALTER TABLE `employeeinfo` DISABLE KEYS */;
INSERT INTO `employeeinfo` VALUES (1,'testProfile_A','受評人員A','工程事業群','宗陽','2等8級','工程師','2017-01-01','2017-04-01',0,0),(2,'testProfile_B','受評人員B','工程事業群','宗陽','3等6級','工程師','2017-04-01','2017-07-01',0,0),(3,'testProfile_C','受評人員C','工程事業群','宗陽','2等5級','工程師','2018-02-01','2018-05-01',0,0),(4,'testProfile_D','受評人員D','工程事業群','宗陽','3等7級','工程師','2017-05-01','2018-08-01',0,0),(5,'testProfile_X','受評人員X','工程事業群','宗陽','4等1級','工程師','2017-05-01','2018-08-01',0,0);
/*!40000 ALTER TABLE `employeeinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form2`
--

DROP TABLE IF EXISTS `form2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form2` (
  `_id` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '	員工帳號:	專案名稱:季度	',
  `projectName` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '專案名稱',
  `quarter` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '季度',
  `reviewDate` date DEFAULT NULL COMMENT '考核日期',
  `employeeId` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '員工帳號',
  `orderList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL,
  `scoreList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL,
  `totalList` varchar(1000) COLLATE utf8_unicode_520_ci NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form2`
--

LOCK TABLES `form2` WRITE;
/*!40000 ALTER TABLE `form2` DISABLE KEYS */;
/*!40000 ALTER TABLE `form2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `from1`
--

DROP TABLE IF EXISTS `from1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `from1` (
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
  `note` varchar(300) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '備註',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `from1`
--

LOCK TABLES `from1` WRITE;
/*!40000 ALTER TABLE `from1` DISABLE KEYS */;
/*!40000 ALTER TABLE `from1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectinfo`
--

DROP TABLE IF EXISTS `projectinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectinfo` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL COMMENT '專案名稱',
  `contractValue` int(11) NOT NULL COMMENT '合約金額',
  `quarter` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '季度',
  `actualMoney` int(11) NOT NULL DEFAULT '0' COMMENT '實際發放季獎金',
  `accumulation` int(11) NOT NULL DEFAULT '0' COMMENT '累計發放季獎金',
  `fillingPerson` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '	評核人員',
  `password` varchar(10) DEFAULT NULL COMMENT '登入密碼',
  `testList` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '受評人員名單',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectinfo`
--

LOCK TABLES `projectinfo` WRITE;
/*!40000 ALTER TABLE `projectinfo` DISABLE KEYS */;
INSERT INTO `projectinfo` VALUES (1,'專案一',4000,'Q1',0,0,'評核人員X1','1111','testProfile_A,testProfile_B,testProfile_X'),(2,'專案二',8000,'Q2',0,0,'評核人員X2','2222','testProfile_C,testProfile_D');
/*!40000 ALTER TABLE `projectinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-27 15:28:24
