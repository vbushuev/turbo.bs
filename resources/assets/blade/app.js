import Toggler from './components/toggler.js';
$(document).ready( (e) => {
    $('.vsb.toggler').each(function(){
        new Toggler($(this))
    })
})
