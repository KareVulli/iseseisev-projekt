/* jshint esversion: 6 */

export class Category {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    render(parent, onDropCallback) {
        let title = $('<div/>').addClass('row mt-3 category-container').data('id', this.id);

        title.append(
            $('<span/>').addClass('lead col category-title').text(this.name)
        );

        interact(title[0])
            .dropzone({
                accept: '.file-card',
                ondrop: function (event) {
                    console.log(event.target);
                    onDropCallback(event.target, event.relatedTarget);
                }
            })
            .on('dropactivate', function (event) {
                event.target.classList.add('drop-activated');
            })
            .on('dropdeactivate', function (event) {
                event.target.classList.remove('drop-activated');
                event.target.classList.remove('drop-over');
            })
            .on('dragenter', function (event) {
                event.target.classList.add('drop-over');
            })
            .on('dragleave', function (event) {
                event.target.classList.remove('drop-over');
            });

        if (this.id != null) {
            title.append(
                $('<div/>')
                    .addClass('col text-right')
                    .append($('<a/>')
                    .addClass('pull-right btn btn-sm btn-outline-danger btn-category-delete')
                    .data('id', this.id)
                    .text('Delete')
                    .attr('href', '#'))
            );
        }
        

        let body = $("<div/>")
            .addClass("row");
        parent.append(title);
        parent.append(body);
        return body;
    }
}