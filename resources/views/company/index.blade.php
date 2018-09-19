<h3 class="ui horizontal divider">
    {{ __('home.my_companies') }}
</h3>

@include('company.create')
<table class="ui table">
    <thead>
        <tr>
            <th>{{ __('home.company.name') }}</th>
            <th>{{ __('home.company.date') }}</th>
        </tr>
    </thead>
    <tbody>
        @foreach(Auth::user()->companies as $item)
        <tr>
            <td>@include('company.edit',['company'=>$item])</td>
            <td>{{ $item->registered }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
