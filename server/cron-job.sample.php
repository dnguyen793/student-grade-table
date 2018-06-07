<?php

require_once("mysql_credentials.php");

$truncate = "TRUNCATE TABLE [table]";
$result = $conn->query($truncate);

$reinsertSQL = "INSERT INTO `student_data` (`id`, `name`, `grade`, `course_name`) VALUES
(1, 'Brian', 75, 'Sociology'),
(2, 'Matthew', 86, 'Algebra'),
(3, 'Li Z', 92, 'History'),
(4, 'Nolan', 90, 'Criminology'),
(5, 'Duy', 68, 'Finance'),
(6, 'Ethan', 96, 'Photography'),
(7, 'Nick', 89, 'Algebra II'),
(8, 'Andy', 89, 'Geometry'),
(9, 'Dan', 79, 'Physics'),
(10, 'Alex', 95, 'Java'),
(11, 'Evan', 78, 'Economics'),
(12, 'Scott', 100, 'Finance'),
(13, 'Will', 78, 'History');";

$reinsertResult = $conn->query($reinsertSQL);

$conn->close();

?>