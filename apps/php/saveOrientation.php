<?php

header('Access-Control-Allow-Origin: https://localhost:3000');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-type: application/json; charset=UTF-8");

require "errorHandler.php";
require "dbh.inc.php";
require "functions.php";

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);

$deviceId = $data->deviceId;
$rotationId = $data->rotationId;
$rotation = $data->rotation;

insertRotations($db, [$data]);
