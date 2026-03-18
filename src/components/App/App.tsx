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

import ReactPaginate from 'react-paginate';

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

    // плавний скрол вгору
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

        setPhotos(data); // ⚠️ для paginate — замінюємо
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
    <div>
      <Container>
        {/* anchor для скролу */}
        <div ref={topRef}></div>

        <Section>
          <Form onSubmit={handleSearch} />
        </Section>

        {/* 🖼 CONTENT */}
        <Section>
          {/* Loader */}
          {isLoading && <Loader />}

          {/* Error */}
          {isError && !isLoading && (
            <Text align="center">Something went wrong. Please try again.</Text>
          )}

          {/* Gallery */}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={setSelectedPhoto} />
          )}
        </Section>

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <Section>
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={(event) => {
                if (isLoading) return;
                setPage(event.selected + 1);
              }}
              forcePage={page - 1}
              containerClassName={`pagination ${isLoading ? 'disabled' : ''}`}
              activeClassName="active"
            />
          </Section>
        )}

        {/* Modal */}
        {selectedPhoto && (
          <Modal onClose={() => setSelectedPhoto(null)}>
            <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
          </Modal>
        )}
      </Container>
    </div>
  );
}
