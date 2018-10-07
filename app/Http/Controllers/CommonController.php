<?php

namespace App\Http\Controllers;

use App\User;
use App\Notifications\CustomerNeedHelp;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    public function help(Request $request){
        $customer = $request->user();
        foreach(User::where('role','admin')->where('email','t.otchet@mail.ru')->get() as $admin){
            $admin->notify(new CustomerNeedHelp($customer));
        }
        return redirect('/thanks');
    }
}
