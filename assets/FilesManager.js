
import { File, getSize } from './File.js';
import { Sorter } from './Sorter.js';
import { Category } from './Category.js';
import { Alert } from './Alert.js';

export class FilesManager {
    constructor(element, sorterElement, categoriesManager) {
        this.files = [];
        this.element = $(element);
        this.sorter = new Sorter(sorterElement);
        this.sorter.setOnSortingChangedCallback(this.onSortingChanged.bind(this));
        this.categoriesManager = categoriesManager;
        this.categoriesManager.onAdded = this.onCategoriesChanged.bind(this);
        this.categoriesManager.onDeleted = this.onCategoriesChanged.bind(this);

        this.element.on('click', '.rename-file-btn', (e) => this.onRenameClick(e));
        this.element.on('click', '.remove-file-btn', (e) => this.onRemoveClick(e));
        
    }

    loadFiles() {
        $.ajax({
            dataType: 'json',
            url: 'api/get-files.php',
            success: (data) => {
                this.parse(data);
                localStorage.setItem('files', JSON.stringify(data));
            }
        })
        .fail(response => {
            var backup = localStorage.getItem('files');
            if (backup) {
                backup = JSON.parse(backup);
                this.parse(backup);
                Alert.showInfo('Failed to load data from the server. Viewing offline version.');
            } else {
                Alert.showError('Failed to load data from the server');
            }
            
        });
    }

    parse(data) {
        this.files = [];
        let totalSize = 0;
        $('#files-count').text(data.length);
        data.forEach(file => {
            this.files.push(new File(file.id, file.name, file.created, file.size, file.location, file.category_id));
            totalSize += parseInt(file.size);
        });
        
        $('#files-size').text(getSize(totalSize));
        this.sorter.sortFiles(this.files);
        this.renderFiles();
    }

    renderFiles() {
        this.element.empty();
        let categories = this.categoriesManager.categories;
        let categoryElements = {};
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            categoryElements[category.id] = category.render(this.element, this.onFileDropped.bind(this));

            
        }
        for (let i = 0; i < this.files.length; i++) {
            if (categoryElements[this.files[i].category] != undefined) {
                let card = this.files[i].getCard(i);
                categoryElements[this.files[i].category].append(card);
                
            }
        }
        
    }

    onRenameClick(e) {
        e.preventDefault();
        let position = $(e.target).closest('.file-card').data('position');
        let file = this.files[position];
        let input = $(e.target).siblings('.rename-file-input');
        if (file.renaming) {
            if (!input.val()) {
                file.renaming = false;
                input.slideUp(300);
                input.removeClass('is-invalid');
            } else {
                input.prop('disabled', true);
                file.rename(input, this.onRenamed.bind(this));
            }
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
        this.sorter.sortFiles(this.files);
        this.renderFiles();
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

    onCategoriesChanged() {
        console.log("onCategoryAdded");
        this.renderFiles();
    }

    onFileDropped(target, file) {
        console.log("onFileDropped " + target);
        let category = $(target).data('id');
        if (category == null) {
            category = -1;
        }
        this.setFileCategory(category, $(file).data('id'));
        
    }

    setFileCategory(category, file) {
        $.post( "api/set-file-category.php", { id: file, category: category }, data => {
            this.loadFiles();
        })
        .fail(function(response) {
            Alert.showError('Failed to update the categories. Make sure you are connected to the internet.');
        });
    }
}