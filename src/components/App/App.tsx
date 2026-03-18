import { useState } from 'react';
import type { Photo } from '../../types/photo';
import Form from '../Form/Form';

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

  return (
    <div>
      <Form onSubmit={handleSearch} />
    </div>
  );
}
