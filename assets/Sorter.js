
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
}