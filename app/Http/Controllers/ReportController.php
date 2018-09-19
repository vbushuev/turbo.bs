<?php

namespace App\Http\Controllers;

use Log;
use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data["user_id"] = $request->user()->id;
        $data['status']='new';
        $validator = Validator::make($data, [
            "user_id" => 'required|exists:users,id',
            "name"=>'string|required'
        ]);
        if ($validator->fails()) {
            Log::debug('Validation:'.json_encode($validator) );
            return Redirect::back()
                        ->withErrors($validator)
                        ->withInput();
        }
        $report = Report::create($data);
        return redirect()
            ->back()
            ->with('notification',"Отчет <b>{$report->name}</b> создан. Можете добавлять файлы")
            ->withInput();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Report $report)
    {
        $report->update($request->all());
        return redirect()
            ->back()
            ->with('notification',"Отчет <b>{$report->name}</b> изменен")
            ->withInput();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy(Report $report)
    {
        foreach($report->files() as $file){
            Storage::delete($file->file);
            $file->delete();
        }
        $report->delete();
        return redirect()
            ->back()
            ->with('notification',"Отчет <b>{$report->name}</b> удален");
    }
}
