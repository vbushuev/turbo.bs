<a class="vsb toggler" data-target="#user_{{ $user->id }}_edit">{{ $user->title ?? '' }}</a>
<form action="/user/{{$user->id}}" method="POST" id="user_{{ $user->id }}_edit">
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
        <label>{{ __('home.user.name') }}</label>
        <div class="input-group">
            <i class="list icon"></i>
            <input class="form-control" name="name" value="{{ $user->name ?? old('name') }}" placeholder="{{ __('home.user.name') }}" required/>
        </div>
    </div>

    <div class="form-group required">
        <label>{{ __('home.user.setpassword') }}</label>
        <div class="input-group">
            <i class="eye icon"></i>
            <input class="form-control" name="password" value="{{ old('password') }}" placeholder="{{ __('home.user.password') }}" required/>
        </div>
    </div>
    <div class="form-group right aligned">
        <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
    </div>
</form>
