<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class collection extends Model
{
    //
    use HasFactory;

    public $incrementing = false;
    protected $fillable = [
        'id',
        'title',
        'original_title',
        'year',
        'poster',
    ];

    public function poster(): Attribute
    {
        return Attribute::make(
            get: fn($poster) => "https://image.tmdb.org/t/p/original" . $poster
        );
    }
    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(playlist::class, 'collection_playlists')->withTimestamps();
    }
}
