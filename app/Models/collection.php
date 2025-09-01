<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


/**
 * @see
 */

class collection extends Model
{

    use HasFactory;

    public $incrementing = false;
    protected $appends = ['url',];
    protected $hidden = ['pivot'];
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
            get: fn($poster) => config('services.tmdb.image_url') . $poster
        );
    }


    protected function url(): Attribute
    {
        return new Attribute(
            get: fn() => url("movie/detail/{$this->id}")

        );
    }
    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(playlist::class, 'collection_playlists')->withTimestamps();
    }



    #[Scope]
    protected function sharedCollection(Builder $query, int $playlist_id): void
    {
        $query->join("collection_playlists", "collections.id", "=", "collection_playlists.collection_id")
            ->where("collection_playlists.playlist_id", $playlist_id)
            ->select("collections.id", "title", "original_title", "year as release_date", "poster");
    }
}
