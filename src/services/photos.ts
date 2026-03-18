import axios from 'axios';
import type { Photo } from '../types/photo';

axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] =
  import.meta.env.VITE_PEXELS_API_KEY;

axios.defaults.params = {
  orientation: 'landscape',
};

// interface PexelsResponse {
//   photos: Photo[];
// }

// export const fetchPhotos = async (query: string): Promise<Photo[]> => {
//   const res = await axios.get<PexelsResponse>('search', {
//     params: {
//       query,
//       per_page: 15,
//     },
//   });

//   return res.data.photos;
// };

interface PexelsResponse {
  photos: Photo[];
  total_results: number;
  per_page: number;
}

export const fetchPhotos = async (
  query: string,
  page: number
): Promise<{ photos: Photo[]; totalPages: number }> => {
  const res = await axios.get<PexelsResponse>('search', {
    params: {
      query,
      per_page: 15,
      page,
    },
  });

  const totalPages = Math.ceil(res.data.total_results / res.data.per_page);

  return {
    photos: res.data.photos,
    totalPages,
  };
};
