type LangCardProps = {
  img: string;
  title: string;
};

const API_URL = "";

const TechCard = ({ title, img }: LangCardProps) => {
  return (
    <div >
      <div className="flex font-bold rounded-2xl p-2 flex-row min-w-[150px] text-center h-11 bg-lang-card transition-transform animate-my-gradient hover:scale-110  justify-start items-center hover:animate-pulse">
        <div className="w-[25px] h-auto">
          <img src={API_URL + img} />
        </div>
        <p className="text-center flex flex-1 items-center justify-center">
          {title}
        </p>
      </div>
    </div>
  );
};

export default TechCard;
