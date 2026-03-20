import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  isLoading,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(event) => {
        if (isLoading) return;
        onPageChange(event.selected + 1);
      }}
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName={styles.page}
      previousClassName={styles.page}
      nextClassName={styles.page}
      breakClassName={styles.page}
      disabledClassName={styles.disabled}
    />
  );
}
