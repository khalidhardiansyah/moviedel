export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}
export interface Genre {
    id: number;
    name: string;
}

export interface Collection {
    id: number;
    title: string;
    original_title: string;
    release_date: string;
    poster: string;
    url: string;
}

export interface Playlist {
    id: number;
    name: string;
    name_slug: string;
    url: string;
    is_public?: boolean;
}

export interface SharePlaylist extends Playlist {
    name_slug: string;
    collections: Collection[];
}

export interface MovieDetail extends Collection {
    genres: Genre[];
    overview: string;
    poster: string;
    videos: Array;
}
export type TypeToast = "success" | "error" | "info" | "warning" | "dark";

export interface response {
    message: string;
    status: TypeToast;
}
export interface flash {
    response: response;
}

export interface UserPlaylists extends Playlist {
    collections: Collection[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    user: User;
    playlists: Playlist[];
    playlist: SharePlaylist;
    user_playlist: UserPlaylists[];
    movie: MovieDetail;
    recommendation_list: Collection[];
    movies: Collection[];
    flash: flash;
};
