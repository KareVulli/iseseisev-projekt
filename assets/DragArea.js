
export class DragArea {
    constructor(input, form, area, modal) {
        this.fileInput = $(input);
        this.form = $(form);
        this.dropArea = $(area);
        this.modal = $(modal);

        this.form.submit((e) => this.onFormSubmit(e));

        this.dropArea.on('dragenter', (e) => this.onEnter(e));
        this.dropArea.on('dragleave', (e) => this.onLeave(e));
        this.dropArea.on('dragover', (e) => this.onOver(e));
        this.dropArea.on('drop', (e) => this.onDrop(e));
    }

    onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleFiles(this.fileInput.prop('files'));
    }

    onEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.addHighlight();
    }
    onOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.addHighlight();
    }
    onLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.removeHighlight();
    }
    onDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.removeHighlight();

        let dt = e.originalEvent.dataTransfer;
        let files = dt.files;
        this.handleFiles(files);
    }
    addHighlight() {
        this.dropArea.addClass('bg-primary');
    }

    removeHighlight() {
        this.dropArea.removeClass('bg-primary');
    }

    handleFiles(files) {
        ([...files]).forEach(this.uploadFile);
    }

    uploadFile(file) {
        let url = 'api/upload-file.php';
        let formData = new FormData();

        formData.append('file', file);

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(() => { console.log('upload successful') })
        .catch(() => { console.log('upload failed') });
    }
    
}