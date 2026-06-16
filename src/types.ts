export interface NewsItem {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
}

export interface GalleryItem {
    id: number;
    title: string;
    imageUrl: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface NewsSectionProps {
    news: NewsItem[];
}

export interface SliderProps {
    news: NewsItem[];
}

export interface GallerySectionProps {
    gallery: GalleryItem[];
}