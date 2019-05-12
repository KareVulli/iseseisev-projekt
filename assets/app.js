/* jshint esversion: 6 */

import { FilesManager } from './FilesManager.js';
import { CategoriesManager } from './CategoriesManager.js';


let files = [];
let dragArea;
let categories = new CategoriesManager('#files', '#category-modal', '#category-name-input', '#add-category-btn');
let manager = new FilesManager('#files', '#sort-select', categories);
let dropzone;

Dropzone.autoDiscover = false;
Dropzone.options.uploadFiles = {
    paramName: 'file',
    maxFilesize: 20, // MB
    dictDefaultMessage: 'Click to select files or drag files here to upload...',
    init: function() {
        this.on('error', function(event, errorMessage, xhr) { 
            if (xhr) {
                $(event.previewElement).find('.dz-error-message').text(errorMessage.message);
            }
        });
        this.on('success', function(event, response) { 
            manager.loadFiles();
        });
        
    }
};

function onCategoriesLoaded() {
    manager.loadFiles();
}

$(function() {
    categories.load(onCategoriesLoaded);
    dropzone = new Dropzone('#upload-files');

    $('#upload-modal').on('hidden.bs.modal', function (e) {
        dropzone.removeAllFiles();
    })

    
    if ('serviceWorker' in navigator) {
        console.log('Registering service worker');
        navigator.serviceWorker.register('service-worker.js')
            .then((reg) => {
                console.log('Service worker registered!', reg);
            });
    }
});





