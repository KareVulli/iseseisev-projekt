<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    if (!isset($_POST['id']) || !isset($_POST['name'])) {
        sendResponse(400, ['message' => 'Invalid parameters!']);
    }

    $stmt = $db->prepare('UPDATE displayname = ? FROM files WHERE id = ?');
    $stmt->execute([$_POST['id'], $_POST['name']]);


    sendResponse(200, ['message' => 'Name changed successfully']);