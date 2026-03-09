import { useState } from 'react';
import Form from '../Form/Form';

import './App.css';

export default function App() {
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return <Form onSubmit={handleSearch} />;
}
