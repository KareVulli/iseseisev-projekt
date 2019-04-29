<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../includes/requests.php';
require_once __DIR__ . '/../includes/config.php';

if (!isset($_POST['id'])) {
    sendResponse(400, ['message' => 'Invalid parameters!']);
}

$stmt = $db->prepare('DELETE FROM files WHERE id = ?');
$stmt->execute([$_POST['id']]);


sendResponse(200, ['message' => 'File removed successfully']);