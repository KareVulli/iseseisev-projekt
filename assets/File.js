/* jshint esversion: 6 */

export class File {
    constructor (id, name, created, size, path, category = null) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.size = size;
        this.path = path;
        this.category = category;
        this.renaming = false;
        this.position = {x: 0, y: 0};
        this.element = null;
    }

    getCard(position) {
        if (this.element == null) {
            this.element = $('<div/>').addClass('col-md-6 col-lg-4 file-card').data('id', this.id).data('position', position);
            this.element.append(
                '<div class="card my-3">' +
                    '<div class="card-body">' +
                        '<div class="d-flex justify-content-between align-items-start">' +
                            '<h6 class="card-title text-break">' + this.name + '</h6>' +
                            '<a class="btn btn-sm btn-outline-info text-nowrap" href="' + this.path + '" download="' + this.name + '" ><i class="fas fa-download"></i> Download</a>' +
                        '</div>' +
                        '<p class="card-text">Size: ' + this.getFileSize() + '</p>' +
                        '<p class="card-text"><small class="text-muted">Uploaded at: ' + this.created + '</small></p>' +
                    '</div>' +
                    '<div class="card-footer text-muted text-right">' +
                        '<input class="form-control rename-file-input mb-2" type="text" style="display: none;" placeholder="New name...">' +
                        '<a class="btn btn-sm btn-outline-primary mr-2 rename-file-btn" href="#">Rename</a>' +
                        '<a class="btn btn-sm btn-outline-danger remove-file-btn" href="#"><i class="fas fa-trash"></i> Delete</a>' +
                    '</div>' +
                '</div>'
            );

            interact(this.element[0]).draggable({
                listeners: {
                    start: event => {
                        this.position = {x: 0, y: 0};
                    },
                    end: event => {
                        event.target.style.transform = '';
                    },
                    move: event => {
                        this.position.x += event.dx
                        this.position.y += event.dy
                        event.target.style.transform = 'translate(' + this.position.x + 'px, ' + this.position.y + 'px)';
                        
                    },
                }
            });
        }
        return this.element;
    }

    // Source: https://stackoverflow.com/a/18650828
    getFileSize(decimals = 2) {
        return getSize(this.size);
    }

    remove(onRemoved) {
        $.post( "api/remove-file.php", { id: this.id }, function( data ) {
            onRemoved(true);
        })
        .fail(function(response) {
            onRemoved(false);
        });
    }

    rename(element, onRenamed) {
        $.post( "api/rename-file.php", { id: this.id, name: element.val() }, function( data ) {
            onRenamed(element, true);
        })
        .fail(function(response) {
            onRenamed(element, false);
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