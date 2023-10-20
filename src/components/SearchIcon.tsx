import Lottie from "lottie-react";
import json from "../lotties/searchMarker.json";


const SearchInput = (props: { loop: boolean }) => {

    return <Lottie animationData={json} {...props} />;
}

export default SearchInput;
