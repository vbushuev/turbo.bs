<?php

namespace App\Http\Controllers\Auth;

use App\User;

use Illuminate\Http\Request;
use App\Notifications\CustomerRegister;
use App\Notifications\NotifyNewCustomer;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [

            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|regex:/(\+7)[0-9]{9}/'
            // 'password' => 'required|string|min:6|confirmed',
            // 'name' => 'required|string|max:255',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data){
        $data['password'] = str_random(12);
        $customer = User::create([
            'name' => 'empty',
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
        ]);
        $customer->notify(new CustomerRegister($customer,$data['password']));
        return $customer;
    }
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();
        $user = $this->create($request->all());
        event(new Registered($user));
        foreach(User::where('role','admin')->where('email','t.otchet@mail.ru')->get() as $admin){
            $admin->notify(new NotifyNewCustomer($user));
        }
        //$this->guard()->login($user);

        return $this->registered($request, $user)
                        ?: redirect('/thanks');//redirect($this->redirectPath());
    }
}
