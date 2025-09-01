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
            get: fn() => url(route('playlist.share_show', [
                'user_slug' => User::where('id', '=', $this->user_id)->value('name_slug'),
                'playlist_slug' => $this->name_slug
            ]))
        );
    }

    #[Scope]
    protected function playlistSlug(Builder $query, string $playlist_slug, int $user_id): void
    {
        $query->where("name_slug", $playlist_slug)
            ->where("is_public", true)
            ->where('user_id', '=', $user_id)
            ->select("id", "name", "name_slug", 'is_public', 'user_id');
    }


    #[Scope]
    protected function playlistByUser(Builder $query, int $user_id): void
    {
        $query->select('id', 'name', 'name_slug', 'is_public', 'user_id')
            ->where('user_id', '=', $user_id)
            ->with(['collections' => fn($collection) => $collection
                ->select('collections.id', 'poster', 'title', 'original_title', 'year as release_date')]);
    }
    function collections(): BelongsToMany
    {
        return $this->belongsToMany(collection::class, 'collection_playlists')->withTimestamps();
    }
}
