
import { useState } from 'react';
import { Search } from 'lucide-react';


interface IHeaderProps{
  onSearch: (city: string) => void;
}

export function Header ({ onSearch }: IHeaderProps){

  const [city, setCity] = useState<string>('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city);
      setCity('');  // Limpa o campo de pesquisa após a busca
    }
  };
  


  return(
    <header className='flex items-center mt-3 mb-6 justify-center p-4'>
      <div className='flex gap-8'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite sua localidade"
          className="p-4 w-[30rem] rounded-2xl bg-zinc-800 bg-opacity-75 text-zinc-400 text"
        />
        <button
          onClick={handleSearch}
          className="bg-zinc-800 p-4 text-zinc-400 rounded-full font-semibold"
        >
          <Search />
        </button>
      </div>
    </header>
  )
}