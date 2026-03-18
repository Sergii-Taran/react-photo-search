import { useState, useEffect } from 'react';
import type { Photo } from '../../types/photo';
import { fetchPhotos } from '../../services/photos';
import Form from '../Form/Form';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Container from '../ui/Container/Container';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPhotos([]);
  };

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchPhotos(query);
        console.log('PHOTOS:', data);
        setPhotos(data);
      } catch (error) {
        console.error('ERROR:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query]);

  return (
    <div>
      <Container>
        <Form onSubmit={handleSearch} />

        {photos.length > 0 && (
          <PhotosGallery photos={photos} onSelect={setSelectedPhoto} />
        )}
      </Container>
    </div>
  );
}
