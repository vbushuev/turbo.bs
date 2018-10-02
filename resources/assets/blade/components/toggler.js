class Toggler {
    constructor(toggler){
        this.toggler = toggler;
        this.$toggler = $(this.toggler);
        console.debug('Toggler class',this);
        if(this.$toggler.hasClass('assigned')) return;
        this.$toggler.addClass('assigned');
        this.selector = $(this.toggler).data('target');
        this.$container = $(`${this.selector}`);
        if(!this.$container)console.error(`data-target="${this.selector}" not found`);
        this.draw();
        this.bind();
    }
    bind(){
        this.$toggler.on('click', (e) => {
            this.redraw(this.$toggler.hasClass('active'));
        })
    }
    draw(){
        this.toggler.append('<i class="fas fa-caret-down"></i>');
        this.$container.hide();
    }
    redraw(active=true){
        console.debug('redraw',this.$toggler.find('.fas'));
        if(active){
            this.$container.slideUp();
            this.$toggler.removeClass('active');
            this.$toggler.find('.fas').removeClass('fa-caret-up').addClass('fa-caret-down');
        }else {
            this.$toggler.find('.fas').removeClass('fa-caret-down').addClass('fa-caret-up');
            this.$container.slideDown();
            this.$toggler.addClass('active');
        }

    }
}
export default Toggler;
