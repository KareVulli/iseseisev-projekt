/* jshint esversion: 6 */

export class Category {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    render(parent) {
        let title = $('<div/>').addClass('row mt-3');

        title.append(
            $('<span/>').addClass('lead col').text(this.name)
        );
        title.append(
            $('<div/>').addClass('col text-right').append($('<a/>').addClass('pull-right btn btn-sm btn-outline-danger').text('Delete').attr('href', '#'))
        );
        

        let body = $("<div/>")
            .addClass("row");
        parent.append(title);
        parent.append(body);
        return body;
    }
}