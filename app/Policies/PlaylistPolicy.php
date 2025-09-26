<?php

namespace App\Policies;

use App\Models\playlist;
use App\Models\User;

class PlaylistPolicy
{
    /**
     * Create a new policy instance.
     */

    public function __construct() {}

    public function delete(User $user,  playlist $playlist): bool
    {
        return $user->id === $playlist->user_id;
    }
    public function update(User $user,  playlist $playlist): bool
    {
        return $user->id === $playlist->user_id;
    }
}
