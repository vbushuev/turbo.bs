<?php

namespace App\Http\Controllers;
use Log;
use App\User;
use App\File;
use App\Company;
use App\Report;
use Illuminate\Http\Request;

class AdminController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!$request->user()->isAdmin()) return redirect()->route('home.index');
        $users = User::onlyCustomers()->get();
        $companies = Company::all();
        $reports = Report::all();
        $files = File::orderBy('id');
        if(strlen($request->input('search',''))){
            $se = "%{$request->search}%";
            $files->whereIn('user_id',User::where('name','like',$se)->orWhere('email','like',$se)->pluck('id'));
        }
        if(strlen($request->input('date',''))){
            $dates = [
                date('Y-m-d 00:00:00',strtotime($request->date)) ,
                date('Y-m-d 23:59:59',strtotime($request->date))
            ];
            $files->whereBetween('created_at',$dates);
        }
        if(strlen($request->input('status',''))){
            $files->whereIn('report_id',Report::where('status',$request->status)->pluck('id'));
        }
        return view('admin',[
            'users'=>$users,
            'companies'=>$companies,
            'reports'=>$reports,
            'files'=>$files->orderBy('id','desc')->get(),
        ]);
    }
}
