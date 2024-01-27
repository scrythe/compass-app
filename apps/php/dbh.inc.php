<?php

$host = 'localhost';
$dbname = 'compass';
$name = 'root';
$pwd = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $name, $pwd);
} catch (PDOException $e) {
    die($e->getMessage());
}

$websitePath = "http://localhost";
