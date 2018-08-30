<?php

namespace App\Http\Controllers;

use Log;
use Redirect;
use App\File;
use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
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

        $validator = Validator::make($data, [
            "user_id" => 'required|exists:users,id',
            "name"=>'string|required',
            "file"=>'file|required',
        ]);
        if ($validator->fails()) {
            Log::debug('Validation:'.json_encode($validator) );
            return Redirect::back()
                        ->withErrors($validator)
                        ->withInput();
        }
        if(!$request->has('report_id')){
            $report = Report::where('name',$data['name'])->first();
            if(is_null($report))$report = Report::create(['name'=>$data['name'],'user_id'=>$request->user()->id]);
            $data['report_id']=$report->id;
        }
        $validator = Validator::make($data, [
            "report_id"=>'required|exists:reports,id'
        ]);
        if ($validator->fails()) {
            Log::debug('Validation:'.json_encode($validator) );
            return Redirect::back()
                        ->withErrors($validator)
                        ->withInput();
        }
        $file=$request->file->store('public');
        Log::debug("File: ".$file);
        $file = File::create($data);
        return redirect()->route('home.index')->with('status',__('home.status.file_uploaded'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        //
    }
}
