import type { Photo } from '../../types/photo';
import Grid from '../ui/Grid/Grid';
import GridItem from '../ui/GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

import style from './PhotosGallery.module.css';

interface PhotosGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}

export default function PhotosGallery({
  photos,
  onSelect,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <GridItem key={photo.id}>
          <PhotosGalleryItem photo={photo} onClick={() => onSelect(photo)} />
        </GridItem>
      ))}
    </Grid>
  );
}
