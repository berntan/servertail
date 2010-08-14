var cursor = null;

function tail(path, elt) {
    var queryString = cursor ? {cursor: cursor} : {};
    $.getJSON(path, queryString, function(data) {
        cursor = data.cursor;
        for(var i = 0; i < data.lines.length; ++i) {
            $('<li></li>').text(data.lines[i].line).appendTo(elt);
        }
        while($(elt + ' li').length > 100) {
            $(elt + ' li:first').remove();
        }
        /* The 9999 here is a hack */
        $(elt).animate({scrollTop: 9999}, 100);
        tail(path, elt);
    });
}