<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'name', 'file','user_id','report_id'
    ];
    public function report(){
        return $this->belongsTo('App\Report');
    }
    public function user(){
        return $this->belongsTo('App\User');
    }
}
