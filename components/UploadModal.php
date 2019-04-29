<div class="modal fade" id="upload-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload a file</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- <form id="upload-form" class="form-inline" enctype="multipart/form-data" method="post" action="api/upload-file.php">
                    <div class="custom-file mb-2 mr-sm-2">
                        <input id="file-input" type="file" class="custom-file-input" name="file">
                        <label class="custom-file-label" for="file" data-browse="Browse..." >Select File...</label>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Upload file</button>
                </form>
                <hr>
                <p class="text-center" >Or</p>
                <div id="drag-area" class="jumbotron jumbotron-fluid">
                    <div class="container text-center">
                        <p>Drag files here...</p>
                    </div>
                </div> -->
                <form action="api/upload-file.php" class="dropzone" id="upload-files"></form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-block" data-dismiss="modal">Done</button>
            </div>
        </div>
    </div>
</div>