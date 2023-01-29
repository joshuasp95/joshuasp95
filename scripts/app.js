'use strict'

$(document).ready(function () {
    $('body').on({
        'mousemove': function (e) {
            console.clear();
            let x = e.originalEvent.clientX;
            let y = e.originalEvent.clientY;
            $('#cursor').css({
                'left' : (x-40) + 'px',
                'top' : (y-40) + 'px'
            })
        }})
        $('a').on({
            'mouseover' : function(){
                $('#cursor').addClass('mini');
            },
            'mouseout' : function(){
                $('#cursor').removeClass('mini')
            }
        })
})



