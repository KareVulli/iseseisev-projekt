<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    if (!isset($_POST['id']) || !isset($_POST['category'])) {
        sendResponse(400, ['message' => 'Invalid parameters!']);
    }

    if ($_POST['id'] != null) {
        $stmt = $db->prepare('SELECT id FROM categories WHERE id = ?');
        $stmt->execute([$_POST['category']]);
        if (!$stmt->fetch()) {
            sendResponse(400, ['message' => 'Selected category does not exist!']);
        }
    }

    $stmt = $db->prepare('UPDATE files SET category_id = ? WHERE id = ?');
    $stmt->execute([$_POST['category'], $_POST['id']]);


    sendResponse(200, ['message' => 'Category changed successfully']);