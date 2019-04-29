<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    $stmt = $db->prepare('SELECT id, displayname, created, filesize, filename FROM files WHERE removed_at IS NULL');
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch()) {
        $file = [];
        $file['id'] = $row['id'];
        $file['name'] = $row['displayname'];
        $file['created'] = $row['created'];
        $file['size'] = $row['filesize'];
        $file['location'] = '/uploads/' . $row['filename'];
        $data[] = $file;
    }
    sendResponse(200, $data);