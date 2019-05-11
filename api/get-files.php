<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../includes/requests.php';
    require_once __DIR__ . '/../includes/config.php';

    $sortBy = 'created';
    $direction = 'DESC';
    if (isset($_GET['sort'])) {
        switch($_GET['sort']) {
            case 'name': 
                $sortBy = 'f.displayname';
                $direction = 'ASC';
                break;
            case 'time': 
                $sortBy = 'f.created';
                $direction = 'DESC';
                break;
            case 'size': 
                $sortBy = 'f.filesize';
                $direction = 'DESC';
                break;
            default:
                $sortBy = 'f.created';
                $direction = 'DESC';
                break;
        }
    }

    $stmt = $db->prepare(
        'SELECT f.id, f.displayname, f.extension, f.created, f.filesize, f.filename, f.category_id, c.name AS category_name
        FROM files f
        LEFT JOIN categories c ON c.id = f.category_id
        WHERE f.removed_at IS NULL
        ORDER BY ' . $sortBy . ' ' . $direction);
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch()) {
        $file = [];
        $file['id'] = $row['id'];
        $file['name'] = $row['displayname'] . '.' . $row['extension'];
        $file['created'] = $row['created'];
        $file['size'] = $row['filesize'];
        $file['location'] = 'uploads/' . $row['filename'];
        $file['category_id'] = $row['category_id'];
        $file['category'] = $row['category_name'];
        $data[] = $file;
    }
    sendResponse(200, $data);