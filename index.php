<?php
    require_once __DIR__ . '/vendor/autoload.php';
    require_once 'components/FileCard.php';


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="A simple public file storage application">
    <title>Care Cloud</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/basic.css">
    <link rel="stylesheet" href="assets/css/dropzone.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="assets/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="assets/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="manifest.json">
    <meta name="msapplication-TileColor" content="#00fff0">
    <meta name="msapplication-TileImage" content="assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#00fff0">
</head>

<body>
    <?php require('./components/UploadModal.php'); ?>
    <?php require('./components/CategoryModal.php'); ?>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">Care Cloud</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a id="upload-file" class="nav-link" data-toggle="modal" data-target="#upload-modal" href="#"><i class="fas fa-plus"></i> Upload new file...</a>
                </li>
                <li class="nav-item">
                    <a id="upload-file" class="nav-link" data-toggle="modal" data-target="#category-modal" href="#"><i class="fas fa-folder-plus"></i> Add new category...</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="row mt-4">
            <div class="col-lg col-md-3 col-sm-6">
                <span class="h4">Your files</span>
            </div>
            <?php require('./components/SortSelect.php'); ?>
            <div class="col-sm-12 col-md-auto">
                <h5 class="text-muted mt-2">Files: <span id="files-count">0</span> Total size: <span id="files-size">0 Bytes</span></h5>
            </div>
        </div>
        <hr>
        <div id="status" class="alert" style="display: none;">         
        </div>
        <div id="files" class="mt-4">
        </div>

    </div>

    <script src="https://code.jquery.com/jquery-3.4.0.min.js" integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
    <script src="assets/lib/dropzone.js"></script>
    <script src="assets/app.js" type="module"></script>
</body>

</html>