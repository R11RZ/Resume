


type LinkCardProps = {
    href: string;
    img: string;
    title:string;
}


const LinkCard = ({href , img , title}: LinkCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"

      className="h-15 w-10/12 max-w-[250px] rounded-2xl transition-transform hover:scale-110 flex items-center justify-start font-bold text-xl shadow-card p-5  "
    >
      <img className="w-[30px]  " src={img} />
      <div className="w-full text-center">{title}</div>
    </a>
  );
};

export default LinkCard;
