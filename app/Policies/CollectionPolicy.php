<?php

namespace App\Policies;

use App\Models\collection;
use App\Models\playlist;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CollectionPolicy
{

    public function delete(User $user, playlist $playlist): bool
    {
        return $user->id === $playlist->user_id;
    }
}
