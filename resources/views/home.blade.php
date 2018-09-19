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
            <a class="nav-link" id="companies-tab" data-toggle="tab" href="#companies" role="tab" aria-controls="companies" aria-selected="false">{{ __('home.my_companies') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">{{ __('home.files') }}</a>
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
        <div class="tab-pane show active" id="request" role="tabpanel" aria-labelledby="request-tab">
            <h2>
                {{ __('home.common') }}
            </h2>
            <div class="vsb list">
                <div class="vsb item">Ваш баланс <span class="right aligned">0р</span></div>
                <div class="vsb item">Текущий статус - <span class="right aligned">Новичок</span></div>
                <div class="vsb item">Получение ЭЦП - <span class="right aligned">Документы поданы</span></div>
            </div>

        </div>
        <div class="tab-pane " id="companies" role="tabpanel" aria-labelledby="companies-tab">
            @include('company.index')
        </div>
        <div class="tab-pane " id="reports" role="tabpanel" aria-labelledby="reports-tab">
            @include('report.index')
        </div>
        <div class="tab-pane " id="files" role="tabpanel" aria-labelledby="files-tab">
            @include('file.index')

        </div>

    </div>
    <div class="ui bottom attached tab segment" data-tab="uploaded"></div>
    <div class="ui bottom attached tab segment" data-tab="reports"></div>
</div>
@endsection
