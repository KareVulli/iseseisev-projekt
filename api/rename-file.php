<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    if (!isset($_POST['id']) || !isset($_POST['name'])) {
        sendResponse(400, ['message' => 'Invalid parameters!']);
    }

    if (empty($_POST['name'])) {
        sendResponse(400, ['message' => 'Empty name!']);
    }

    $stmt = $db->prepare('UPDATE files SET displayname = ? WHERE id = ?');
    $stmt->execute([$_POST['name'], $_POST['id']]);


    sendResponse(200, ['message' => 'Name changed successfully']);