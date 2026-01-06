-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: saurav_portfolio
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','$2a$10$x4hGmWQsZDKFnINhhcx65eO1rdtSjS51HngGxxmmgxa.nxbkz6wye','Administrator','admin@example.com',1,'2025-11-13 19:40:54',NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cat_key` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cat_key` (`cat_key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'youtube','YouTube Videos','Professional video editing showcasing advanced color grading and motion graphics','https://img.youtube.com/vi/Qr0upTwWZ1I/maxresdefault.jpg','2025-11-13 19:14:30'),(2,'genai','GenAI Ads','Professional AI-generated content showcasing cutting-edge generative technology','/videos/genai/genai.mp4','2025-11-13 19:14:30'),(3,'brand','Brand Films','High-end brand films and client showcases','https://img.youtube.com/vi/Un123D2GxIU/maxresdefault.jpg','2025-11-13 19:14:30');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `meta_key` (`meta_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_thumbs`
--

DROP TABLE IF EXISTS `video_thumbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_thumbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NOT NULL,
  `path` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_thumbs_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_thumbs`
--

LOCK TABLES `video_thumbs` WRITE;
/*!40000 ALTER TABLE `video_thumbs` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_thumbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `source` enum('local','youtube') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'youtube',
  `video_identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `thumb` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,1,'youtube','Qr0upTwWZ1I','Professional Video Edit Showcase #1','Professional video editing showcasing advanced color grading, motion graphics, and cinematic transitions','https://img.youtube.com/vi/Qr0upTwWZ1I/maxresdefault.jpg',1,'2025-11-13 19:14:30'),(2,1,'youtube','TyuP7_B2URo','Premium Content Creation','High-quality content creation with professional editing, audio mixing, and visual effects','https://img.youtube.com/vi/TyuP7_B2URo/maxresdefault.jpg',2,'2025-11-13 19:14:30'),(4,1,'youtube','TyuP7_B2URo','Premium Content Creation','High-quality content creation with professional editing, audio mixing, and visual effects','https://img.youtube.com/vi/TyuP7_B2URo/maxresdefault.jpg',0,'2025-11-15 07:21:40'),(5,1,'youtube','KWIFZqyoBNA','YouTube Short #1 - Quick Edit','Professional short-form video with quick cuts, effects, and engaging transitions','https://img.youtube.com/vi/KWIFZqyoBNA/maxresdefault.jpg',0,'2025-11-15 07:21:40'),(6,1,'youtube','sfHTCvVoD7M','YouTube Short #2 - Dynamic Content','Trending short-form content with professional editing and visual effects','https://img.youtube.com/vi/sfHTCvVoD7M/maxresdefault.jpg',0,'2025-11-15 07:21:40'),(7,1,'youtube','5OhMb6mWuns','Full Length Professional Video','Complete production video featuring professional editing, color grading, and sound design','https://img.youtube.com/vi/5OhMb6mWuns/maxresdefault.jpg',0,'2025-11-15 07:21:40'),(8,2,'local','/uploads/1763195899786-6723344.mp4','GenAI Creative Sample','Professional AI-generated content showcasing cutting-edge generative technology','/videos/genai/genai.mp4',0,'2025-11-15 07:21:40'),(9,2,'local','/uploads/1763195882496-955646971.mp4','JSW GenAI Sample','JSW GenAI-powered commercial with advanced visual effects and color grading','/uploads/1763195882662-540582187.png',0,'2025-11-15 07:21:40'),(10,2,'local','/uploads/1763195859297-338668473.mp4','Nescafe 4K GenAI','Nescafe brand commercial created with AI generation technology in 4K resolution','/uploads/1763195859761-439765898.png',0,'2025-11-15 07:21:40'),(11,2,'local','/uploads/1763195836010-615787912.mp4','Sunscreen SBV GenAI','Sunscreen product ad with AI-generated visuals and professional editing','/videos/genai/Sunscreen_SBV_10.mp4',0,'2025-11-15 07:21:40'),(12,2,'local','/uploads/1763195798025-859248258.mp4','Tata Motors','Tata Motors commercial featuring AI-generated automotive visuals and effects','/videos/genai/Tata Motors Sample.mp4',0,'2025-11-15 07:21:40'),(13,3,'youtube','Un123D2GxIU','Brand Film - Client Showcase','Brand film showcased on YouTube featuring professional production and cinematography','https://img.youtube.com/vi/Un123D2GxIU/maxresdefault.jpg',0,'2025-11-15 07:21:40'),(14,3,'local','/uploads/1763194827990-689592362.mp4','Vidboost Brand Film','Professional brand film with advanced visual effects and storytelling','/videos/brandFlim/vidboost_web_8.mp4',0,'2025-11-15 07:21:40'),(15,2,'local','/uploads/1763194827990-689592362.mp4','Your Video Title','Your description','/uploads/1763194862332-208034567.jpg',0,'2025-11-15 08:32:39');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-06 13:02:02
