export interface UserForNewsEmail {
    email: string;
    name?: string;
    // Add other user properties if needed
}

export interface MarketNewsArticle {
    headline: string;
    summary: string;
    url: string;
    datetime: number;
    // Add other article properties if needed
}