<a href="#" class="text-nowrap text-semibold vsb right floated" data-toggle="modal" data-target="#needHelpModal">
    {{ __('home.needhelp') }}
</a>
@push('script')
<div class="modal" tabindex="-1" role="dialog" id="needHelpModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form class="formz" action="/help" method="POST" id="need_help_form" name="need_help_form" class="" data-event-name="adding-file" >
                {{ csrf_field() }}
                <div class="modal-header">
                    <h5 class="modal-title">{{ __('home.needhelp') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Оставьте заявку - менеджер свяжется с Вами</p>
                    <p>Или позвоните по телефону: +7(922) 351-6901</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="submit" class="btn btn-primary" onclick="document.need_help_form.submit();">{{ __('home.help') }}</button>
                </div>
            </form>
        </div>
  </div>
</div>
@endpush
