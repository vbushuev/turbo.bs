@extends('layouts.app')
@section('content')
<div class="container">
    <nav class="nav">
        <a class="nav-link active">
            {{ __('home.main') }}
        </a>
    </nav>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="request-tab" data-toggle="tab" href="#request" role="tab" aria-controls="request" aria-selected="true">{{ __('home.request') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="reports-tab" data-toggle="tab" href="#reports" role="tab" aria-controls="reports" aria-selected="false">{{ __('home.reports') }}</a>
        </li>
        <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
        </li> -->
    </ul>
    <div class="tab-content" id="myTabContent">
        <!-- <div class="ui three steps">
            <div class="active step">
                <i class="upload icon"></i>
                <div class="content">
                    <div class="title">{{ __('home.upload') }}</div>
                </div>
            </div>
            <div class="disabled step">
                <i class="sync icon"></i>
                <div class="content">
                    <div class="title">{{ __('home.wework') }}</div>
                </div>
            </div>
            <div class="disabled step">
                <i class="checkmark icon"></i>
                <div class="content">
                    <div class="title">{{ __('home.success_work') }}</div>
                </div>
            </div>
        </div> -->
        <div class="tab-pane  show active" id="request" role="tabpanel" aria-labelledby="request-tab">
            <h2>
                {{ __('home.upload_report') }}
            </h2>
            <form action="/file" method="POST" enctype="multipart/form-data">
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
                    <label>{{ __('home.report.file') }}</label>
                    <div class="input-group">
                        <i class="file icon"></i>
                        <input class="form-control" name="file" type="file" value="{{ old('file') }}" placeholder="{{ __('home.report.file') }}" required/>
                    </div>
                </div>
                <div class="form-group right aligned">
                    <button type="submit" class="btn btn-primary">{{ __('home.do') }}</button>
                </div>
            </form>

        </div>
        <div class="tab-pane " id="reports" role="tabpanel" aria-labelledby="reports-tab">
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
        </div>

    </div>
    <div class="ui bottom attached tab segment" data-tab="uploaded"></div>
    <div class="ui bottom attached tab segment" data-tab="reports"></div>
</div>
@endsection
