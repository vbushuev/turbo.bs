<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name', 'inn','kpp','okved','accountant','description','registered','user_id'
    ];
}
