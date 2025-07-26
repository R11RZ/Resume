import VesselsProjectCanvas from "../WasmCanvas/VesselsProjectCanvas/VesselsProjectCanvas";


type WasmSceenProps = {
    index_wasm:number
}

const WasmSreens = [<VesselsProjectCanvas />];



const WasmSceen = ({index_wasm}:WasmSceenProps) =>{
    return WasmSreens[index_wasm]
}

export default WasmSceen;
