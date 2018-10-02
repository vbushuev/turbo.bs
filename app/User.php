<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','role','phone','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    public function getTitleAttribute(){
        return ($this->name == "empty" || !strlen(trim($this->name)))?$this->email:$this->name;
    }
    public function isAdmin(){
        return in_array($this->role,['admin','superadmin','system']);
    }
    public function companies(){
        return $this->hasMany('App\Company');
    }
    public function reports(){
        return $this->hasMany('App\Report');
    }
    public function files(){
        return $this->hasMany('App\File');
    }
    public function scopeOnlyCustomers($query){
        return $query->whereIn('role',['customer']);
    }
}
