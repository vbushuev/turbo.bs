<a href="#" class="text-nowrap text-semibold add-file-link vsb highlight">
    {{ __('home.upload_file') }}
</a>
@push('hide')
<div id="AddFileLightBoxContent" data-event-name="add-file">
    <div class="lightbox-title" data-on-submit="hide">{{ __('home.upload_file') }}</div>
    <form class="formz" action="/file" method="POST" enctype="multipart/form-data" id="file_upload" name="file_upload" class="" data-event-name="adding-file" >
        {{ csrf_field() }}
        <input type="hidden" name="status" value="new" />
        @if($errors->any())
        <div class="ui error ">
            @foreach($errors->all() as $error)
                {{ $error }}<br />
            @endforeach
        </div>
        @endif
        <div class="js-successMessage text-center" style="line-height: 1.45;"></div>
        <div class="form-row">
            <div class="form-input-wrap">
                <input class="form-input" data-val="true" data-val-requiredlocalized="Заполните поле" name="name" placeholder="{{ __('home.file.name') }}" value="{{ old('name') }}" type="text" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-input-wrap">
                <input class="form-input" data-val="true"  data-val-requiredlocalized="Заполните поле" name="file" placeholder="{{ __('home.file.file') }}" value="{{ old('file') }}" type="file" required>
            </div>
        </div>
        <div class="hide" data-lightbox-role="bottom-panel">
            <div class="policy">
                Отправляя файл, я&nbsp;соглашаюсь на&nbsp;<a href="polit.html" target="_blank">обработку персональных данных</a> и&nbsp;получение информационных сообщений от компании Турбо.Отчет.
            </div>
            <button type="submit" id="mylink" class="btn btn-sm btn-secondary m-r-xs" onclick="document.file_upload.submit();">
                {{ __('home.do') }}
            </button>
        </div>
    </form>
</div>
@endpush
@push('script')
<script>
$(function() {
    Kontur.CallbackLightbox.init('.add-file-link', {
        lightbox: '#AddFileLightBoxContent',
        wrapperStyle: {
            width: '430px'
        },
        lightboxClass: 'callback-lightbox'
    });
});
</script>
@endpush
