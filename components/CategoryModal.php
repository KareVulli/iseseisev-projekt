<div class="modal fade" id="category-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add a new category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="upload-form" method="post" action="api/add-category.php">
                    <div class="form-group">
                        <label for="category-name-input">Category name</label>
                        <input type="text" class="form-control" id="category-name-input" >
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="add-category-btn" class="btn btn-outline-primary">Add</button>
                <button type="button" class="btn" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>