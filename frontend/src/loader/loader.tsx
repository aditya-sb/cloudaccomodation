
import Lottie from 'lottie-react';
import lottieLoader from './lottieLoader.json';

const Loader = () => {

  return (
    <div
      className=
        'w-full flex flex-col items-center justify-center'
      style={{ height: 'calc(100vh - 200px)' }}
    >
      <Lottie animationData={lottieLoader} loop autoplay />
      {/* {showText && (
        <h3 className="text-lg font-semibold text-body italic">
          {t(text)}
        </h3>
      )} */}
    </div>
  );
};

export default Loader;
