<?php
    namespace FileCard;
    
    function render($filename) {
        echo 
        '<div class="col-2">' .
            '<div class="card">' .
                '<div class="card-body">' .
                    $filename .
                '</div>' .
            '</div>' .
        '</div>';
    }
?>