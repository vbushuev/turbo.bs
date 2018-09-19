<?php

namespace App\Http\Controllers;

use Log;
use App\Company;
use App\File;
use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
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
        $data["status"] = 'new';
        $validator = Validator::make($data, [
            "user_id" => 'required|exists:users,id',
            "name"=>'string|required',
            "inn"=>'numeric|required',
            "kpp"=>'numeric|required',
            "okved"=>'string|required',
            "accountant"=>'string',
            "description"=>'string',
        ]);
        if ($validator->fails()) {
            Log::debug('Validation:'.json_encode($validator) );
            return Redirect::back()
                        ->withErrors($validator)
                        ->withInput();
        }
        $company = Company::create($data);
        return redirect()
            ->back()
            ->with('notification',"Компания <b>{$company->name}</b> добавлена")
            ->withInput();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Company $company)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $company->update($request->all());
        return redirect()
            ->back()
            ->with('notification',"Компания <b>{$company->name}</b> изменена")
            ->withInput();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()
            ->back()
            ->with('notification',"Компания <b>{$company->name}</b> удалена");
    }
}
