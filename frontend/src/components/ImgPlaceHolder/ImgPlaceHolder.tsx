import IconClick from "@/assets/icons/IconClick";


type PlaceHolderProps = {
    PreView:string,
}

const API_URL = ""

const ImgPlaceHolder = ({PreView}:PlaceHolderProps) =>{

    return (        <div className="relative inline-block w-full h-full rounded-2xl">
              <img className="h-full w-full block rounded-2xl " src={API_URL + PreView} />
                <div className="absolute rounded-2xl inset-0 bg-preview-card flex z-10 justify-center items-center" >
                <IconClick className="transition-transform hover:scale-110"  style={{width: "48px" , height: "48px"}} />
                </div>
              </div>)
}

export default ImgPlaceHolder;