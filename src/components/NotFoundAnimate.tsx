import Lottie from "lottie-react";
import json from "../lotties/robot.json";


const NotFoundAnimate = (props: { loop: boolean }) => {

    return <Lottie animationData={json} {...props} />;
}

export default NotFoundAnimate;
