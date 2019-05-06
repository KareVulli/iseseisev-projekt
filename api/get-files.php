<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    $sortBy = 'created';
    $direction = 'DESC';
    if (isset($_GET['sort'])) {
        switch($_GET['sort']) {
            case 'name': 
                $sortBy = 'displayname';
                $direction = 'ASC';
                break;
            case 'time': 
                $sortBy = 'created';
                $direction = 'DESC';
                break;
            case 'size': 
                $sortBy = 'filesize';
                $direction = 'DESC';
                break;
            default:
                $sortBy = 'created';
                $direction = 'DESC';
                break;
        }
    }

    $stmt = $db->prepare('SELECT id, displayname, extension, created, filesize, filename FROM files WHERE removed_at IS NULL ORDER BY ' . $sortBy . ' ' . $direction);
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch()) {
        $file = [];
        $file['id'] = $row['id'];
        $file['name'] = $row['displayname'] . '.' . $row['extension'];
        $file['created'] = $row['created'];
        $file['size'] = $row['filesize'];
        $file['location'] = 'uploads/' . $row['filename'];
        $data[] = $file;
    }
    sendResponse(200, $data);