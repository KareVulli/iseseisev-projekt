
import { File, getSize } from './File.js';
import { Sorter } from './Sorter.js';

export class FilesManager {
    constructor(element, sorterElement) {
        this.files = [];
        this.element = $(element);
        this.sorter = new Sorter(sorterElement);
        this.sorter.setOnSortingChangedCallback(this.onSortingChanged.bind(this));

        this.element.on('click', '.rename-file-btn', (e) => this.onRenameClick(e));
        this.element.on('click', '.remove-file-btn', (e) => this.onRemoveClick(e));
    }

    loadFiles() {
        $.ajax({
            dataType: 'json',
            url: 'api/get-files.php',
            data: {
                sort: this.sorter.current
            },
            success: (data) => {
                this.files = [];
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
        for (let i = 0; i < this.files.length; i++) {
            this.element.append(this.files[i].getCard(i));
        }
    }

    onRenameClick(e) {
        e.preventDefault();
        let position = $(e.target).closest('.file-card').data('position');
        let file = this.files[position];
        let input = $(e.target).siblings('.rename-file-input');
        if (file.renaming) {
            input.prop('disabled', true);
            file.rename(input, this.onRenamed.bind(this));
        } else {
            file.renaming = true;
            input.prop('disabled', false);
            input.slideDown(300);
        }
    }

    onRemoveClick(e) {
        e.preventDefault();
        let position = $(e.target).closest('.file-card').data('position');
        this.files[position].remove(this.onRemoved.bind(this));
    }

    onRemoved(success) {
        this.loadFiles();
    }

    onSortingChanged() {
        this.loadFiles();
    }

    onRenamed(element, success) {
        if (success) {
            element.slideUp(300, () => this.loadFiles());
            element.removeClass('is-invalid');
        } else {
            element.prop('disabled', false);
            element.addClass('is-invalid');
        }
    }
}