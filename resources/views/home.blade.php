@extends('layouts.app')
@section('content')
<div class="container">
    <!-- <nav class="nav">
        <a class="nav-link active">
            {{ __('home.main') }}
        </a>
    </nav> -->

    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="request-tab" data-toggle="tab" href="#request" role="tab" aria-controls="request" aria-selected="true">{{ __('home.request') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="companies-tab" data-toggle="tab" href="#companies" role="tab" aria-controls="companies" aria-selected="false">{{ __('home.my_companies') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">{{ __('home.files') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="reports-tab" data-toggle="tab" href="#reports" role="tab" aria-controls="reports" aria-selected="false">{{ __('home.reports') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
        </li>
    </ul> -->
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="request" role="tabpanel" aria-labelledby="request-tab">
            <h2>
                {{ __('home.common') }}
            </h2>
            @include('common.needhelp')
            @if(Auth::user()->status == "ready")
                @include('file.create')
                <table class="vsb table" style="margin-top: 2em;">
                    <thead>
                        <tr>
                            <th>{{ __('home.report.name') }}</th>
                            <th>{{ __('home.report.date') }}</th>
                            <th>{{ __('home.report.status.title') }}</th>
                            <th>{{ __('home.report.file') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach(Auth::user()->reports as $item)
                            <tr>
                                <td>{{ $item->name }}</td>
                                <td>{{ $item->created_at }}</td>
                                <td>{{ __('home.report.status.'.$item->status) }}</td>
                                <td>
                                    @foreach($item->files as $file)
                                        <a href="{{ $file->file }}" download>Скачать <i class="fa fa-file-download"></i></a>
                                    @endforeach
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                @php($found=false)
                @foreach(Auth::user()->files as $item)
                    @if($item->name=="Документы на ЭЦП")
                        @php($found=true)
                        <h3>Статус получения ЭЦП</h3>
                        <p>По состоянию на <b>{{ $item->created_at }}</b></p>
                            <p>{{ __('home.user.status.'.Auth::user()->status) }}</p>
                    @endif
                @endforeach
                @if(!$found)
                    <p>Для предоставления отчетности нам необходимо оформить ЭЦП</p>
                    <p>Загрузите необходимые документы и мы все оформим за Вас!</p>
                    @include('file.etsp')
                @endif
            @endif

            <!-- <div class="vsb list">
                <div class="vsb item">Ваш баланс <span class="right aligned">0р</span></div>
                <div class="vsb item">Текущий статус - <span class="right aligned">Новичок</span></div>
                <div class="vsb item">Получение ЭЦП - <span class="right aligned">Документы поданы</span></div>
            </div> -->

        </div>
    </div>
    <div class="ui bottom attached tab segment" data-tab="uploaded"></div>
    <div class="ui bottom attached tab segment" data-tab="reports"></div>
</div>
@endsection
