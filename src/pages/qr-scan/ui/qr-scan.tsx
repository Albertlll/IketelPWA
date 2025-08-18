// import { Link, useNavigate } from 'react-router';
// import { useEffect, useRef, useState } from 'react';
// import { Button } from '@/shared/ui/button';

function QrScan() {



  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [error, setError] = useState<string | null>(null);
  // const [detectedCode, setDetectedCode] = useState<string>("");
  // // const navigator = useNavigate();

  // const barcodeDetector = new BarcodeDetector({formats : ['qr_code']})


  // useEffect(() => {
  //   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.BarcodeDetector){
  //     setError("Устройство не поддерживает сканирование QR кода");
  //   }


  //   navigator.mediaDevices.getUserMedia({ video : true}).then((stream) => {
  //     if (videoRef.current !== null) {
  //       videoRef.current.srcObject = stream
  //       videoRef.current.play()
  //     }
  //   })

  // }, [])



  // const qrCheck = async () => {
  //   if (!videoRef.current) return;

  //   const canvas = document.createElement('canvas');

  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;

  //   const context = canvas.getContext('2d');



  //   const checkQrCode = async () => {

  //     if (!videoRef.current) return;
  //     context?.drawImage(videoRef.current, canvas.width, canvas.height)

  //     const barcodes = barcodeDetector.detect(canvas);

  //      if (barcodes.lenght > 0) {
  //                let barcodeData = barcodes[0].rawValue;
  //                alert("Detected QR code with the following content: "+barcodeData); 
  //            };
  //   }



  //   requestAnimationFrame(checkQrCode)
  // }

  return (
    <div className=' w-full h-full flex items-center justify-center p-5'>
      Тут сканер
    </div>

    //     error === null ? 
    //   <video onLoadedMetadata={qrCheck} className=' rounded-[50px] w-fit h-fit p-5' ref={videoRef}/>
    //     :
    //   <div className=' flex items-center justify-center flex-col gap-4 border-2 border-primary rounded-[20px] p-5 box-border'>

    //     <div>
    //     {error}
    //     </div>

    //     <Link to={"/"}>
    //     <Button>
    //       Вернуться
    //     </Button>
    //     </Link>
    //   </div>
    // }
    // </div>

  );
}

export default QrScan;