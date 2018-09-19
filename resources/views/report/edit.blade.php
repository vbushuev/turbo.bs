<a class="vsb toggler" data-target="#report_{{ $report->id }}_edit">{{ $report->name ?? '' }}</a>
<form action="/report/{{$report->id}}" method="POST" id="report_{{ $report->id }}_edit">
    {{ csrf_field() }}
    {{ method_field('PUT') }}
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
            <input class="form-control" name="name" value="{{ $report->name ?? old('name') }}" placeholder="{{ __('home.report.name') }}" required/>
        </div>
    </div>
    
    <div class="form-group required">
        <label>{{ __('home.report.description') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <textarea class="form-control" name="description"  required>{{ $report->description ?? old('description') }}</textarea>
        </div>
    </div>
    <div class="form-group right aligned">
        <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
    </div>
</form>
