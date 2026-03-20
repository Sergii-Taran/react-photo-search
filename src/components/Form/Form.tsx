import { FiSearch } from 'react-icons/fi';
import { useRef } from 'react';
import style from './Form.module.css';

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleAction = (formData: FormData) => {
    const value = formData.get('search');

    if (typeof value !== 'string') return;

    const query = value.trim();

    if (!query) return;

    onSubmit(query);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef} className={style.form} action={handleAction}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit" aria-label="Search">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
