-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 23-12-2025 a las 19:49:32
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tetrio_hub_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

DROP TABLE IF EXISTS `contactos`;
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nacimiento` date DEFAULT NULL,
  `pais` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nivel_experiencia` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `horas_juego` int DEFAULT NULL,
  `interes_principal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferencias` text COLLATE utf8mb4_unicode_ci,
  `comentario` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `fecha`, `nombre`, `email`, `nacimiento`, `pais`, `nivel_experiencia`, `horas_juego`, `interes_principal`, `preferencias`, `comentario`) VALUES
(1, '2024-01-15 10:00:00', 'TetrGod_99', 'pro@tetr.io', '1998-05-20', 'brasil', 'experto', 35, 'torneos', 'news, notificaciones', 'Espero ganar el próximo torneo.'),
(2, '2024-01-16 11:30:00', 'NewbieJuan', 'juan@gmail.com', '2005-02-14', 'mexico', 'principiante', 2, 'guias', 'notificaciones', 'Me cuesta hacer T-Spins.'),
(3, '2024-01-18 09:15:00', 'Sarah_Stacker', 'sarah@hotmail.com', '2000-11-01', 'estados_unidos', 'avanzado', 15, 'comunidad', 'news', 'Gran comunidad.'),
(4, '2024-01-20 14:00:00', 'ChileCampeon', 'pedro@yahoo.cl', '1995-08-30', 'chile', 'intermedio', 8, 'noticias', 'notificaciones', 'Saludos desde Santiago.'),
(5, '2024-02-01 18:45:00', 'KazuyaM', 'kazuya@jp.net', '1992-01-12', 'otros', 'experto', 40, 'torneos', 'news', 'Busco equipo para la liga.'),
(9, '2024-02-14 22:30:00', 'SpeedRunner', 'fast@sonic.com', '1997-06-10', 'argentina', 'experto', 38, 'torneos', 'notificaciones', 'Demasiado lag en el servidor a veces.'),
(10, '2024-02-20 08:00:00', 'Lau_Lau', 'laura@gmail.com', '2006-09-09', 'colombia', 'principiante', 3, 'guias', 'news', 'Recién empiezo.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
