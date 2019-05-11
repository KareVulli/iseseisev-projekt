import { Category } from './Category.js';

export class CategoriesManager {
    constructor(modal, nameInput, submitButton) {
        this.categories = [];
        this.modalElement = $(modal);
        
        this.nameInput = $(nameInput);
        this.submitButton = $(submitButton);
        this.submitButton.click(e => {
            e.preventDefault();
            this.addCategory(this.nameInput.val());
        });

        this.load();
    }

    addCategory(name) {
        this.modalElement.find('.category-error').remove();
        $.post( "api/add-category.php", { name: name }, data => {
            this.modalElement.modal('hide');
        })
        .fail(response => {
            this.modalElement.find('.modal-body').prepend(
                '<div class="alert alert-danger category-error" role="alert">' +
                    'Failed to add category: ' + JSON.parse(response.responseText).message +
                '</div>'
            );
        });
    }

    load(callback) {
        $.ajax({
            dataType: 'json',
            url: 'api/get-categories.php',
            success: (data) => {
                this.categories = [];
                
                data.forEach(file => {
                    this.categories.push(new Category(file.id, file.name));
                });
                if (callback) {
                    callback();
                }
            }
        });
    }

    
}