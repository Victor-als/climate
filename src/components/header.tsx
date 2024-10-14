import { useState } from 'react';
import { Search } from 'lucide-react';
import logo from '../assets/climate-logo.svg';


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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  
  return(
    <header className="fixed w-full flex items-center justify-between 
     h-24 bg-opacity-90 backdrop-blur-lg z-50 2xl:px-8 px-8">  
      <div className="2xl:ml-4"> 
       <img  src={logo} alt="Logo" />
      </div>

      <div className="flex gap-4 mx-auto">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua localidade"
          className="p-4 xl:w-[16rem] 2xl:w-[30rem] h-11 rounded-2xl bg-zinc-800 
           bg-opacity-75 text-zinc-400"
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