<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class playlist extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'name_slug',
        'is_public',
    ];


    function collections(): BelongsToMany
    {
        return $this->belongsToMany(collection::class, 'collection_playlists')->withTimestamps();
    }
}
