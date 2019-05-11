<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';


    $stmt = $db->prepare(
        'SELECT id, name
        FROM categories
        WHERE removed_at IS NULL');
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch()) {
        $category = [];
        $category['id'] = $row['id'];
        $category['name'] = $row['name'];
        $data[] = $category;
    }
    sendResponse(200, $data);