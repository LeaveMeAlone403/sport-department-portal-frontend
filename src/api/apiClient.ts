import axios from 'axios';
import type {NewsItem, GalleryItem, ContactFormData, ApiResponse} from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  getNews: async (): Promise<NewsItem[]> => {
    try {
      const response = await axios.get<NewsItem[]>(
        `${API_BASE_URL}/news`
      );
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження новин:', error);
      return [];
    }
  },

  getGallery: async (): Promise<GalleryItem[]> => {
    try {
      const response = await axios.get<GalleryItem[]>(
        `${API_BASE_URL}/gallery`
      );
      return response.data;
    } catch (error) {
      console.error('Помилка завантаження галереї:', error);
      return [];
    }
  },

  submitContactForm: async (data: ContactFormData): Promise<ApiResponse<null>> => {
    try {
      const response = await axios
        .post<ApiResponse<null>>(`${API_BASE_URL}/contacts`, data);
      return response.data;
    } catch (error) {
      console.error('Помилка відправки форми:', error);
      return {success: false, error: 'Не вдалося відправити повідомлення'};
    }
  }
};