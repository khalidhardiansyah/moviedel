<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class playlist extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'is_public',
        'name_slug'
    ];

    protected function casts()
    {
        return ['is_public' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::creating(function (self $playlist) {
            $playlist->name_slug = Str::slug($playlist->name . ' ' . $playlist->user_id);
        });
    }

    function collections(): BelongsToMany
    {
        return $this->belongsToMany(collection::class, 'collection_playlists')->withTimestamps();
    }
}
