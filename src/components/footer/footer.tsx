import looOpenweather from "../../assets/openweather.png";

export function Footer () {
  return (
    <footer className="flex flex-col 2xl:flex-row items-center justify-center gap-4 mt-6">
      <p className="text-zinc-600 font-bold text-md 2xl:text-lg">
        Copyright 2024 DevVictor ALL Rights Reserved 
      </p>

      <div className="flex items-center justify-center gap-4"> 
        <span className="text-zinc-600 font-bold text-md 2xl:text-lg">Powered By</span>
        <img  className="h-8 2xl:h-10" src={looOpenweather} alt="Logo openweather" />
      </div>
    </footer>
  )
}