require('../bootstrap');
require('../semantic');
$(document).ready((a,b,c,d)=>{
    console.debug('home.js');
    // fix menu when passed
    // $('.start-header').visibility({
    //     once: false,
    //     onBottomPassed: function() {
    //         $('.fixed.menu').transition('fade in');
    //     },
    //     onBottomPassedReverse: function() {
    //         $('.fixed.menu').transition('fade out');
    //     }
    // });

    // create sidebar and attach to menu open
    $('.settings.sidebar').sidebar('attach events', '#settings');
    $('.support.sidebar').sidebar('attach events', '#support');
    $('.tabular .item').tab();
});
