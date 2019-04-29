
import { File, getSize } from './File.js';

export class FilesManager {
    constructor(element) {
        this.files = [];
        this.element = $(element);

        this.element.on('click', '.remove-file-btn', (e) => onRemoveClick(e));
    }

    loadFiles() {
        $.ajax({
            dataType: 'json',
            url: 'api/get-files.php',
            success: (data) => {
                let totalSize = 0;
                $('#files-count').text(data.length);
                data.forEach(file => {
                    this.files.push(new File(file.id, file.name, file.created, file.size, file.location));
                    totalSize += parseInt(file.size);
                });
                console.log(totalSize);
                
                $('#files-size').text(getSize(totalSize));
                this.renderFiles();
            }
        });
    }

    renderFiles() {
        this.element.empty();
        this.files.forEach(file => {
            this.element.append(file.getCard());
        });
    }

    onRemoveClick(e) {
        e.preventDefault();
        let id = $(e.target).data('id');
        this.files[id].remove(onRemoved);
    }

    onRemoved() {
        loadFiles();
    }
}