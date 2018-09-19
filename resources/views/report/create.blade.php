<h4 class="vsb toggler" data-target="#report_create">{{ __('home.add_report') }}</h4>
<form action="/report" method="POST" id="report_create">
    {{ csrf_field() }}
    @if($errors->any())
    <div class="ui error ">
        @foreach($errors->all() as $error)
            {{ $error }}<br />
        @endforeach
    </div>
    @endif
    <div class="form-group required">
        <label>{{ __('home.report.name') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <input class="form-control" name="name" value="{{ old('name') }}" placeholder="{{ __('home.report.name') }}" required/>
        </div>
    </div>
    <div class="form-group required">
        <label>{{ __('home.report.description') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <textarea class="form-control" name="description"  required>{{ old('description') }}</textarea>
        </div>
    </div>
    <div class="form-group right aligned">
        <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
    </div>
</form>
