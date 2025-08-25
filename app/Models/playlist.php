<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class playlist extends Model
{
    //
    use HasFactory;
    protected $appends = ['url'];
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

    protected function url(): Attribute
    {
        return new Attribute(
            get: fn() => url("/users/{$this->name_slug}/playlists/$this->name_slug")
        );
    }

    #[Scope]
    protected function playlistSlug(Builder $query, $playlist_slug): void
    {
        $query->where("name_slug", $playlist_slug)->where("is_public", true)->select("id", "name", "name_slug", 'is_public', 'user_id');
    }

    function collections(): BelongsToMany
    {
        return $this->belongsToMany(collection::class, 'collection_playlists')->withTimestamps();
    }
}
