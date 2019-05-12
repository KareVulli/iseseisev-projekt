import { Category } from './Category.js';
import { Alert } from './Alert.js';

export class CategoriesManager {
    constructor(element, modal, nameInput, submitButton) {
        this.categories = [];
        this.modalElement = $(modal);
        this.filesElement = $(element);
        
        this.nameInput = $(nameInput);
        this.onAdded = null;
        this.onDeleted = null;
        this.submitButton = $(submitButton);
        this.submitButton.click(e => {
            e.preventDefault();
            this.addCategory(this.nameInput.val());
        });
        this.filesElement.on('click', '.btn-category-delete', (e) => this.onRemoveEntity(e));
        
    }

    addCategory(name) {
        this.modalElement.find('.category-error').remove();
        $.post( "api/add-category.php", { name: name }, data => {
            this.modalElement.modal('hide');
            this.categories.push(new Category(data.category.id, data.category.name));
            if(this.onAdded) {
                this.onAdded();
            }
        })
        .fail(response => {
            this.modalElement.find('.modal-body').prepend(
                '<div class="alert alert-danger category-error" role="alert">' +
                    'Failed to add category: ' + JSON.parse(response.responseText).message +
                '</div>'
            );
        });
    }

    onRemoveEntity(e) {
        e.preventDefault();
        let button = $(e.target);
        let id = button.data('id');
        console.log('Category: ' + id);
        this.deleteCategory(id);
    }

    deleteCategory(id) {
        if(confirm('Do you really want to delete this category? It will delete all files in the selected category!')) {
            $.post( "api/remove-category.php", { id: id }, data => {
                this.categories.splice(this.categories.findIndex(category => category.id === id), 1);
                if (this.onDeleted) {
                    this.onDeleted();
                }
            })
            .fail(function(response) {
                Alert.showError('Failed to delete the category. Make sure you are connected to the internet.');
            });
        }
       
    }

    load(callback) {
        $.ajax({
            dataType: 'json',
            url: 'api/get-categories.php',
            success: (data) => {
                this.parse(data, callback);
                localStorage.setItem('categories', JSON.stringify(data));
            }
        })
        .fail(response => {
            var backup = localStorage.getItem('categories');
            if (backup) {
                backup = JSON.parse(backup);
                this.parse(backup, callback);
                Alert.showError('Failed to load data from the server. Viewing offline version.');
            } else {
                Alert.showError('Failed to load data from the server');
            }
            
        });
    }

    parse(data, callback) {
        this.categories = [];
        this.categories.push(new Category(null, 'Ungrouped'));
        data.forEach(file => {
            this.categories.push(new Category(file.id, file.name));
        });
        if (callback) {
            callback();
        }
    }

    
}