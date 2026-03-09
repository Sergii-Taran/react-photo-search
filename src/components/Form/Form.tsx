import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const handleAction = (formData: FormData) => {
    const query = (formData.get('search') as string).trim();

    if (!query) return;

    onSubmit(query);
  };

  return (
    <form className={style.form} action={handleAction}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
