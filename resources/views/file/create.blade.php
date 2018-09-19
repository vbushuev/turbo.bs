<h2>
    {{ __('home.upload_file') }}
</h2>
<h4 class="vsb toggler" data-target="#file_upload">{{ __('home.upload_file') }}</h4>
<form action="/file" method="POST" enctype="multipart/form-data" id="file_upload">
    {{ csrf_field() }}
    @if($errors->any())
    <div class="ui error ">
        @foreach($errors->all() as $error)
            {{ $error }}<br />
        @endforeach
    </div>
    @endif
    <div class="form-group required">
        <label>{{ __('home.file.name') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <input class="form-control" name="name" value="{{ old('name') }}" placeholder="{{ __('home.file.name') }}" required/>
        </div>
    </div>
    <div class="form-group required">
        <label>{{ __('home.file.company') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            @include('company.select',["value"=> old( 'company_id' ) ])
        </div>
    </div>
    <div class="form-group required">
        <label>{{ __('home.file.report') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            @include('report.select',["value"=> old( 'report_id' ) ])
        </div>
    </div>
    <div class="form-group required">
        <label>{{ __('home.file.file') }}</label>
        <div class="input-group">
            <i class="file icon"></i>
            <input class="form-control" name="file" type="file" value="{{ old('file') }}" placeholder="{{ __('home.file.file') }}" required/>
        </div>
    </div>
    <div class="form-group right aligned">
        <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
    </div>
</form>
