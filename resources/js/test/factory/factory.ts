export const movie = {
    genres: [
        { id: 12, name: "Adventure" },
        { id: 35, name: "Comedy" },
        { id: 27, name: "Horror" },
    ],
    id: 1279914,
    original_title: "Sekawan Limo",
    overview:
        "In this quirky horror comedy, five hikers explore a mountain, casually heeding superstitious warnings - but later realize that one of them is a ghost.",
    poster: "https://image.tmdb.org/t/p/original/jLiHiQuZDXNOKp1iGMRqNpt8Kx8.jpg",
    release_date: "2024-07-04",
    title: "Five Friends",
    videos: [
        "https://vidsrc.io/embed/movie?tmdb=1279914",
        "https://vidsrc.pm/embed/movie?tmdb=1279914",
        "https://vidsrc.to/embed/movie/1279914",
        "https://player.autoembed.cc/embed/movie/1279914",
        "https://embed.su/embed/movie/1279914",
        "https://multiembed.mov/?video_id=1279914&tmdb=1",
    ],
    url: "xxxx",
};

export const recommendation_list = [
    {
        id: 233,
        name: "xxxxxx",
    },
    {
        id: 233,
        name: "xxxxxx",
    },
];

export const playlist = [
    {
        name: "film ukm mahasiswa",
        id: 1,
        checked: true,
    },
    {
        id: 2,
        name: "film kyai NU",
        checked: false,
    },
    {
        name: "film pemenang cannes fest",
        id: 3,
        checked: false,
    },
];

export function userAuth(isAuthenticated: boolean = false): Object {
    return {
        user: isAuthenticated
            ? {
                  id: 1,
                  name: "khalid",
                  email: "kh@kh.com",
              }
            : null,
    };
}
