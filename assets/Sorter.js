
export class Sorter {
    constructor(element) {
        this.dropdown = $(element);
        this.callback = null;
        this.current = 'time';

        this.dropdown.change(e => {
            e.preventDefault();
            this.onSortingChanged()
        });
    }

    setOnSortingChangedCallback(callback) {
        this.callback = callback;
    }

    onSortingChanged() {
        this.current = this.dropdown.val();
        console.log(this.current);
        if (this.callback) {
            this.callback()
        }
    }

    sortFiles(files) {
        switch(this.current) {
            case 'name':
                console.log("Sorting by name...");
                console.log(files);
                files.sort((a, b) => a.name.localeCompare(b.name));
                console.log(files);
                return;
            case 'time':
                files.sort((a, b) => b.date - a.date);
                return;
            case 'size':
                files.sort((a, b) => b.size - a.size);
                return;
        }
        
    }
}