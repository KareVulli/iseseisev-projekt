<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../includes/requests.php';
require_once __DIR__ . '/../includes/config.php';

if (!isset($_POST['name'])) {
    sendResponse(400, ['message' => 'Invalid parameters!']);
}

if (empty($_POST['name'])) {
    sendResponse(400, ['message' => 'Category name must not be empty!']);
}


$stmt = $db->prepare('INSERT INTO categories (name) VALUES (?)');
$stmt->execute([$_POST['name']]);


sendResponse(201, ['message' => 'Category created successfully']);