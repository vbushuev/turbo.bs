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
        $files = File::all();
        return view('admin',[
            'users'=>$users,
            'companies'=>$companies,
            'reports'=>$reports,
            'files'=>$files,
        ]);
    }
}
