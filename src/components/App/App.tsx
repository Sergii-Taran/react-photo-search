import { useState, useEffect, useRef } from 'react';
import type { Photo } from '../../types/photo';
import { fetchPhotos } from '../../services/photos';

import Form from '../Form/Form';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Container from '../ui/Container/Container';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Text from '../ui/Text/Text';
import Section from '../ui/Section/Section';
import Pagination from '../Pagination/Pagination';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const topRef = useRef<HTMLDivElement | null>(null);

  // 🔍 пошук
  const handleSearch = (query: string) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);

    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 📡 запит до API
  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const { photos: data, totalPages } = await fetchPhotos(query, page);

        setPhotos(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  // 🔝 скрол при зміні сторінки
  useEffect(() => {
    if (page === 1) return;

    topRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <main>
      <Container>
        {/* anchor для скролу */}
        <div ref={topRef}></div>

        {/* 🔍 SEARCH */}
        <Section>
          <Form onSubmit={handleSearch} />
        </Section>

        {/* 🖼 CONTENT */}
        <Section>
          {isLoading && photos.length === 0 && <Loader />}

          {isError && !isLoading && (
            <Text align="center">Something went wrong. Please try again.</Text>
          )}

          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={setSelectedPhoto} />
          )}
        </Section>

        {/* 🔢 PAGINATION */}
        <Section>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </Section>

        {/* 🪟 MODAL */}
        {selectedPhoto && (
          <Modal onClose={() => setSelectedPhoto(null)}>
            <img
              src={selectedPhoto.src.original}
              alt={selectedPhoto.alt || 'Photo'}
            />
          </Modal>
        )}
      </Container>
    </main>
  );
}
