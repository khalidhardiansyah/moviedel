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
        'description',
        'user_id',
        'is_public',
    ];


    function collections(): BelongsToMany
    {
        return $this->belongsToMany(collection::class, 'collection_playlists', 'playlist_id', 'collection_id')->withTimestamps();
    }
}
