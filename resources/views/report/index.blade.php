<h3 class="ui horizontal divider">
    {{ __('home.reports') }}
</h3>
@include('report.create')
<table class="ui table">
    <thead>
        <tr>
            <th>{{ __('home.report.name') }}</th>
            <th>{{ __('home.report.status.title') }}</th>
        </tr>
    </thead>
    <tbody>
        @foreach(Auth::user()->reports as $item)
        <tr>
            <td>@include('report.edit',['report'=>$item])</td>
            <td>{{ __('home.report.status.'.$item->status) }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
