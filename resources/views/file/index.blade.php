<h3 class="ui horizontal divider">
    {{ __('home.files') }}
</h3>
<!-- <h2>{{ __('home.upload_file') }}</h2> -->
@include('file.create')
<h3 class="ui horizontal divider">
    {{ __('home.uploaded') }}
</h3>
<table class="ui table">
    <thead>
        <tr>
            <th>{{ __('home.report.name') }}</th>
            <th>{{ __('home.report.file') }}</th>
            <th>{{ __('home.report.date') }}</th>
        </tr>
    </thead>
    <tbody>
        @foreach(Auth::user()->files as $file)
        <tr>
            <td>{{ $file->name }}</td>
            <td>{{ $file->file }}</td>
            <td>{{ $file->created_at }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
