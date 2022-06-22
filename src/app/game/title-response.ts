export interface Api {
    count: number,
    next: string,
    previous: string,
    results:[
        {
        id: number;
        slug: string;
        name: string;
        name_original: string;
        description: string;
        metacritic: number;
        released: string;
        tba: boolean;
        updated: string;
        background_image: string;
        background_image_additional: string;
        website: string;
        rating: number;
        rating_top: number;
        ratings: [];
        reddit_url: string;
        parent_platforms: [];
        genres: [];
        developers: [];
        publishers: [];
        esrb_rating: any;
        }
    ]
}