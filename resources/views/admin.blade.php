@extends('layouts.app')
@section('content')
<div class="container">
    <nav class="nav">
        <a class="nav-link active">
            {{ __('admin.main') }}
        </a>
    </nav>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="customers-tab" data-toggle="tab" href="#customers" role="tab" aria-controls="customers" aria-selected="true">{{ __('admin.customers') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="reports-tab" data-toggle="tab" href="#reports" role="tab" aria-controls="reports" aria-selected="false">{{ __('admin.reports') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">{{ __('admin.files') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="companies-tab" data-toggle="tab" href="#companies" role="tab" aria-controls="companies" aria-selected="false">{{ __('admin.companies') }}</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <!-- <div class="ui three steps">
            <div class="active step">
                <i class="upload icon"></i>
                <div class="content">
                    <div class="title">{{ __('admin.upload') }}</div>
                </div>
            </div>
            <div class="disabled step">
                <i class="sync icon"></i>
                <div class="content">
                    <div class="title">{{ __('admin.wework') }}</div>
                </div>
            </div>
            <div class="disabled step">
                <i class="checkmark icon"></i>
                <div class="content">
                    <div class="title">{{ __('admin.success_work') }}</div>
                </div>
            </div>
        </div> -->
        <div class="tab-pane  show active" id="customers" role="tabpanel" aria-labelledby="customers-tab">
            <h2>
                {{ __('admin.customers') }}
            </h2>
            <table class="ui table">
                <tbody>
                    @foreach($users as $item)
                    <tr>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->email }}</td>
                        <td>{{ $item->phone }}</td>
                        <td>{{ $item->role }}</td>
                        <td>{{ $item->created_at }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

        </div>
        <div class="tab-pane " id="reports" role="tabpanel" aria-labelledby="reports-tab">
            <h3 class="ui horizontal divider">
                {{ __('admin.reports') }}
            </h3>
            <table class="ui table">
                <tbody>
                    @foreach($reports as $item)
                    <tr>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->status }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="tab-pane " id="files" role="tabpanel" aria-labelledby="files-tab">
            <h3 class="ui horizontal divider">
                {{ __('admin.files') }}
            </h3>
            <table class="ui table">
                <thead>
                    <tr>
                        <th>{{ __('admin.file.name') }}</th>
                        <th>{{ __('admin.file.file') }}</th>
                        <th>{{ __('admin.file.date') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($files as $file)
                    <tr>
                        <td>{{ $file->name }}</td>
                        <td><a href="/public/{{ $file->file }}">Скачать <i class="fa fa-file-download"></i></a></td>
                        <td>{{ $file->created_at }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="tab-pane " id="companies" role="tabpanel" aria-labelledby="companies-tab">
            <h3 class="ui horizontal divider">
                {{ __('admin.companies') }}
            </h3>
            <table class="ui table">
                <tbody>
                    @foreach($companies as $item)
                    <tr>
                        <td>{{ $item->name }}</td>
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
