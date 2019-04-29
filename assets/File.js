/* jshint esversion: 6 */

export class File {
    constructor (id, name, created, size) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.size = size;
    }

    getCard() {
        return '<div class="col-md-6 col-lg-4" data-id="' + this.id + '">' +
            '<div class="card my-3">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + this.name + '</h5>' +
                    '<p class="card-text">Size: ' + this.getFileSize() + '</p>' +
                    '<p class="card-text"><small class="text-muted">Uploaded at: ' + this.created + '</small></p>' +
                '</div>' +
                '<div class="card-footer text-muted text-right">' +
                    '<a class="btn btn-sm btn-outline-primary mr-2" href="#">Rename</a>' +
                    '<a class="btn btn-sm btn-outline-danger remove-file-btn" href="#"><i class="fas fa-trash"></i> Delete</a>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    // Source: https://stackoverflow.com/a/18650828
    getFileSize(decimals = 2) {
        return getSize(this.size);
    }

    removeFile(onRemoved) {
        $.post( "api/remove-file.php", { id: this.id }, function( data ) {
            onRemoved(true);
        });
    }
}

export function getSize(size, decimals = 2) {
    if (size === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}