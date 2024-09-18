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
    <header className='flex w-screen items-center mb-6 justify-center p-4'>
      {/* <span className='text-white'>Climate.Io</span> */}
      <div className='flex mt-3 gap-4 items-center'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite sua localidade"
          className="p-4 w-[25rem] h-11 rounded-2xl bg-zinc-800 bg-opacity-75 text-zinc-400"
        />

       
          <button
            onClick={handleSearch}
            className="bg-zinc-800 h-11 p-4 text-zinc-400 rounded-full font-semibold"
          >
            <Search size={16}/>
          </button>
      </div>
    </header>
  )
}