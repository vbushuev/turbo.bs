<a class="vsb toggler" data-target="#company_{{ $company->id }}_edit">{{ $company->name ?? '' }}</a>
<form action="/company/{{$company->id}}" method="POST" id="company_{{ $company->id }}_edit">
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
        <label>{{ __('home.company.name') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <input class="form-control" name="name" value="{{ $company->name ?? old('name') }}" placeholder="{{ __('home.company.name') }}" required/>
        </div>
    </div>
    <div class="form-row">
        <div class="col">
            <div class="form-group required">
                <label>{{ __('home.company.inn') }}</label>
                <div class="input-group">
                    <i class="file icon"></i>
                    <input class="form-control" name="inn" type="text" value="{{ $company->inn ?? old('inn') }}" placeholder="{{ __('home.company.inn') }}" required/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="form-group required">
                <label>{{ __('home.company.kpp') }}</label>
                <div class="input-group">
                    <i class="file icon"></i>
                    <input class="form-control" name="kpp" type="text" value="{{ $company->kpp ?? old('kpp') }}" placeholder="{{ __('home.company.kpp') }}" required/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="form-group">
                <label>{{ __('home.company.okved') }}</label>
                <div class="input-group">
                    <i class="file icon"></i>
                    <input class="form-control" name="okved" type="text" value="{{ $company->okved ?? old('okved') }}" placeholder="{{ __('home.company.okved') }}" required/>
                </div>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="col">
            <div class="form-group required">
                <label>{{ __('home.company.accountant') }}</label>
                <div class="input-group">
                    <i class="list icon"></i>
                    <input class="form-control" name="accountant" value="{{ $company->accountant ?? old('accountant') }}" placeholder="{{ __('home.company.accountant') }}" required/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="form-group required">
                <label>{{ __('home.company.registered') }}</label>
                <div class="input-group">
                    <i class="list icon"></i>
                    <input class="form-control" name="registered" type="date" value="{{ $company->registered ?? old('registered') }}" placeholder="{{ __('home.company.registered') }}" required/>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group required">
        <label>{{ __('home.company.description') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <textarea class="form-control" name="description"  required>{{ $company->description ?? old('description') }}</textarea>
        </div>
    </div>
    <div class="form-group right aligned">
        <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
    </div>
</form>
