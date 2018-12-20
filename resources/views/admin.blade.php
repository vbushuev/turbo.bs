@extends('layouts.app')
@section('content')
<div class="container vsb admin">
    <h2>{{ __('home.common') }}</h2>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Отчеты</a></li>
        <li class="nav-item"><a class="nav-link" id="etsp-tab" data-toggle="tab" href="#etsp" role="tab" aria-controls="profile" aria-selected="false">Новые клиенты</a></li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="form">
                <form class="form-inline">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                            </div>
                            <input class="form-control" name="search" value="{{ $_GET['search'] ?? '' }}" placeholder="{{ __('admin.search') }}"/>
                        </div>
                        <div class="input-group">
                            <input class="form-control" type="date" name="date" value="{{ $_GET['date'] ?? '' }}" placeholder="{{ __('admin.date') }}"/>
                        </div>
                        <div class="input-group">
                            <select class="form-control" name="status" placeholder="{{ __('admin.status') }}">
                                <option value="">Все</option>
                                <option value="new" @if( isset($_GET['status']) && $_GET['status']=="new") selected="selected" @endif>{{ __('home.report.status.new') }}</option>
                                <option value="fail" @if( isset($_GET['status']) && $_GET['status']=="fail") selected="selected" @endif>{{ __('home.report.status.fail') }}</option>
                                <option value="done" @if( isset($_GET['status']) && $_GET['status']=="done") selected="selected" @endif>{{ __('home.report.status.done') }}</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm">{{ __('admin.search') }}</button>
                </form>
            </div>
            <table class="ui table">
                <thead>
                    <tr>
                        <th>{{ __('admin.customer') }}</th>
                        <th>{{ __('admin.report.name') }}</th>
                        <th>{{ __('admin.report.date') }}</th>
                        <th>{{ __('admin.file.file') }}</th>
                        <th>{{ __('admin.report.status.title') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($files as $item)
                    @if($item->user->role=="customer" && $item->report->name !='Документы на ЭЦП')
                    <tr>
                        <td>
                            @include('user.edit',['user'=>$item->user])
                            <br /><small>Зарегестрирован: {{ $item->user->created_at }}</small>
                            <br /><small>Статус: {{ __('admin.user.status.'.$item->user->status) }}</small>
                            @if($item->user->status == 'request')
                                <button class="btn btn-primary" onclick="document.set_user_{{$item->id}}_new.submit();">Подтвертить пользователя</button>
                                <form action="/user/{{$item->user->id}}" method="POST" name="set_user_{{$item->id}}_new" id="set_user_{{$item->id}}_new">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="new" />
                                </form>
                            @elseif($item->user->status == 'new')
                                <button class="btn btn-primary" onclick="document.set_user_{{$item->id}}_etsp.submit();">ЭЦП получен</button>
                                <form action="/user/{{$item->user->id}}" method="POST" name="set_user_{{$item->id}}_etsp" id="set_user_{{$item->id}}_etsp">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="ready" />
                                </form>
                            @endif
                        </td>
                        <td>{{ $item->report->name }}</td>
                        <td>{{ $item->report->created_at }}</td>
                        <td><a href="{{ $item->file }}" download>Скачать <i class="fa fa-file-download"></i></a></td>
                        <td>
                            {{ __('home.report.status.'.$item->report->status) }}
                            <br />
                            @if($item->report->status == 'new')
                                <button class="btn btn-primary btn-sm" style="display:inline-block" onclick="document.report_{{$item->id}}_done.submit();">{{ __('home.report.status.done') }}</button>
                                <button class="btn btn-warning btn-sm" style="display:inline-block" onclick="document.report_{{$item->id}}_fail.submit();">{{ __('home.report.status.fail') }}</button>

                                <form action="/report/{{$item->report->id}}" method="POST" name="report_{{$item->id}}_done" id="report_{{$item->id}}_done">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="done" />
                                </form>
                                <form action="/report/{{$item->report->id}}" method="POST" name="report_{{$item->id}}_fail" id="report_{{$item->id}}_fail">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="fail" />
                                </form>
                            @endif

                        </td>
                    </tr>
                    @endif
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="tab-pane fade" id="etsp" role="tabpanel" aria-labelledby="etsp-tab">
            <table class="ui table">
                <thead>
                    <tr>
                        <th>{{ __('admin.customer') }}</th>
                        <th>{{ __('admin.report.name') }}</th>
                        <th>{{ __('admin.report.date') }}</th>
                        <th>{{ __('admin.file.file') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($files as $item)
                    @if($item->user->role=="customer" && $item->report->name =='Документы на ЭЦП' && in_array($item->user->status,['request','new']))
                    <tr>
                        <td>
                            @include('user.edit',['user'=>$item->user])
                            <br /><small>Зарегестрирован: {{ $item->user->created_at }}</small>
                            <br /><small>Статус: {{ __('admin.user.status.'.$item->user->status) }}</small>
                            @if($item->user->status == 'request')
                                <br /><button class="btn btn-primary" onclick="document.set_user_{{$item->id}}_new.submit();">Подтвертить пользователя</button>
                                <form action="/user/{{$item->user->id}}" method="POST" name="set_user_{{$item->id}}_new" id="set_user_{{$item->id}}_new">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="new" />
                                </form>
                            @elseif($item->user->status == 'new')
                                <button class="btn btn-primary" onclick="document.set_user_{{$item->id}}_etsp.submit();">ЭЦП получен</button>
                                <form action="/user/{{$item->user->id}}" method="POST" name="set_user_{{$item->id}}_etsp" id="set_user_{{$item->id}}_etsp">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" name="status" value="ready" />
                                </form>
                            @endif
                        </td>
                        <td>{{ $item->report->name }}</td>
                        <td>{{ $item->report->created_at }}</td>
                        <td><a href="{{ $item->file }}" download>Скачать <i class="fa fa-file-download"></i></a></td>
                    </tr>
                    @endif
                    @endforeach
                </tbody>
            </table>

        </div>
    </div>
</div>
@endsection
