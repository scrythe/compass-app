<?php

function emptyRotationData($rotationData) {
  foreach ($rotationData as $data) {
    if (empty($input)) return true;
  }
  return false;
}

function insertRotations($db, $data) {
  foreach ($data as $rotationData) {
    if (!emptyRotationData($rotationData)) {
      echo json_encode("missing fields");
      return;
    }
    $sql = 'INSERT INTO compass (deviceId, rotationId , rotation) VALUES (?, ?, ?)';
    $stmt = $db->prepare($sql);
    $result = $stmt->execute([$rotationData->deviceId, $rotationData->rotationId, $rotationData->rotation]);
   echo json_encode($result);
  }
}

function getOrientations($db) {
  $sql = 'SELECT * FROM compass';
  $stmt = $db->prepare($sql);
  $result = $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($data);
}
