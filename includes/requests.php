<?php
    function sendResponse($status, array $data) {
        header('Content-Type: application/json');
        http_response_code($status);
        echo(json_encode($data));
        die();
    }
?>