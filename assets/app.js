/* jshint esversion: 6 */

import { FilesManager } from './FilesManager.js';
import { DragArea } from './DragArea.js';


let files = [];
let dragArea;
let manager = new FilesManager('#files');


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

$(function() {
    manager.loadFiles();
});




