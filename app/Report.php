<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'name', 'user_id','status'
    ];
    public function report(){
        return $this->belongsTo('App\Company');
    }
}
