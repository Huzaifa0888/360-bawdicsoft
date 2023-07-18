"use client";

import { useMemo, useRef, useState, useEffect } from "react";

// import VideoPopup from "./VideoPopup";

// import ReactPlayer from "react-player";

export const Panorama = ({}) => {
  const Canvas = useRef(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState(false);
  const [hide, sethide] = useState(true);

  const initializePANOLENS = async () => {
    const THREE = await import("three");
    const PANOLENS = await import("panolens");

    const viewer = new PANOLENS.Viewer({
      container: Canvas.current,
      autoRotate: false,
      // autoRotateSpeed: 0.2,
      // autoRotateActivationDuration: 5000,
      // dwellTime: 1000,
      autoHideInfospot: false,
      controlBar: false,
    });
    console.log(
      "🚀 ~ file: Panorama.jsx:29 ~ initializePANOLENS ~ viewer:",
      viewer
    );
    viewer.control.enabled = false;
    // viewer.control[1] = true;
    // viewer.controls[1] = true;
    // viewer.controls[0] = false;
    viewer.DeviceOrientationControls.enabled=true;

    const panorama1 = new PANOLENS.ImagePanorama("/assets/p1.jpg");
    console.log("🚀 ~ file: Panorama.jsx:40 ~ initializePANOLENS ~ panorama1:", panorama1)
    const panorama2 = new PANOLENS.ImagePanorama("/assets/p2.jpg");
    const panorama3 = new PANOLENS.ImagePanorama("/assets/p3.jpg");
    const panorama4 = new PANOLENS.ImagePanorama("/assets/p4.jpg");
    const panorama5 = new PANOLENS.ImagePanorama("/assets/p5.jpg");
    const panorama6 = new PANOLENS.ImagePanorama("/assets/p6.jpg");
    const panorama7 = new PANOLENS.ImagePanorama("/assets/p7.jpg");
    const panorama8 = new PANOLENS.ImagePanorama("/assets/p8.jpg");
    // viewer.add(panorama1, panorama2, panorama3);
    viewer.add(
      panorama1,
      panorama2,
      panorama3,
      panorama4,
      panorama5,
      panorama6,
      panorama7,
      panorama8
    );

    const hotspot1 = createInfospot("/assets/circle.png");
    const hotspot2 = createInfospot("/assets/circle1.png");
    const hotspot3 = createInfospot("/assets/ellipseVip.png");
    const hotspot4 = createInfospot("/assets/circle2.png");
    const hotspot5 = createInfospot("/assets/circle3.png");
    const hotspot6 = createInfospot("/assets/circle4.png");
    const hotspot7 = createInfospot("/assets/circle5.png");
    // const hotspot8 = createInfospot("/assets/circle6.png");

    hotspot1.position.set(8300.0, 500.0, 5000.0);
    hotspot2.position.set(10000.0, -500.0, 10.0);
    hotspot3.position.set(10000.0, 500.0, 10.0);
    hotspot4.position.set(10000.0, -500.0, 10.0);
    hotspot5.position.set(10000.0, -500.0, 10.0);
    hotspot6.position.set(10000.0, -500.0, 10.0);
    hotspot7.position.set(10000.0, -500.0, 10.0);
    // hotspot8.position.set(10000.0, -500.0, 10.0);
    // popupHotspot1.position.set(1800.0, 500.0, 8000.0);
    // popupHotspot2.position.set(1000.0, 500.0, 8000.0);

    panorama1.add(hotspot1);
    // panorama1.add(hotspot1);
    panorama2.add(hotspot2);
    panorama3.add(hotspot3);
    panorama4.add(hotspot4);
    panorama5.add(hotspot5);
    panorama6.add(hotspot6);
    panorama7.add(hotspot7);
    // panorama8.add(hotspot8);

    hotspot1.addEventListener("click", () => {
      viewer.setPanorama(panorama2);
      // setAudio(false);
    });
    hotspot2.addEventListener("click", () => {
      viewer.setPanorama(panorama3);
      // setAudio(true);
    });
    hotspot3.addEventListener("click", () => {
      viewer.setPanorama(panorama4);
      // setAudio(true);
    })
    hotspot4.addEventListener("click", () => {
      viewer.setPanorama(panorama5);
      // setAudio(true);
    });
    hotspot5.addEventListener("click", () => {
      viewer.setPanorama(panorama6);
      // setAudio(true);
    });
    hotspot6.addEventListener("click", () => {
      viewer.setPanorama(panorama7);
      // setAudio(true);
    });
    hotspot7.addEventListener("click", () => {
      viewer.setPanorama(panorama8);
      // setAudio(true);
    });
    // popupHotspot1.addEventListener("click", () => {
    //   setOpen(true);
    //   setAudio(false);
    // });
    // popupHotspot2.addEventListener("click", () => {
    //   setIsOpen(true);
    //   setAudio(false);
    // });
    panorama2.addEventListener("enter-fade-start", () => {
      viewer.getCamera().fov = 80;
      viewer.getCamera().updateProjectionMatrix();
      viewer.tweenControlCenter(new THREE.Vector3(5000.0, 50.0, 3000.9));
    });
    panorama1.addEventListener("enter-fade-start", () => {
      viewer.getCamera().fov = 80;
      viewer.getCamera().updateProjectionMatrix();
      viewer.tweenControlCenter(new THREE.Vector3(5000.0, 50.0, 3000.9));
    });

    function createInfospot(imageUrl) {
      const Infospot = new PANOLENS.Infospot(1000, imageUrl);

      Infospot.animated = true;

      return Infospot;
    }
  };
  const onClose = () => {
    setOpen(false);
    setAudio(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") initializePANOLENS();
  }, [Canvas]);

  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleDME = () => {
    if (typeof DeviceMotionEvent?.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            // User has granted permission
            console.log("granted");
          }
        })
        .catch(console.error);
    }
    sethide(false);
  };

  return (
    <>
      {hide && (
        <div
          onClick={handleDME}
          className="h-screen absolute z-50 w-full lg:hidden block"
        ></div>
      )}
      <div
        ref={Canvas}
        className="w-full h-screen overflow-y-hidden opacity-100 bg-transparent"
      ></div>

      {/* {audio && (
        <audio
          src="/assets/audio.mp3"
          className="w-0 h-0 hidden"
          autoPlay
        ></audio>
      )} */}
      {/* {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-8 lg:w-[50%] ">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl  text-black">Enchanted Tranquility</h2>
              <button
                className=" text-black items-start"
                onClick={() => {
                  setOpen(false);
                  setAudio(true);
                }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.348 14.849a1 1 0 01-1.414 1.414l-2.829-2.828-2.829 2.828a1 1 0 11-1.414-1.414l2.828-2.829L6.293 8.878a1 1 0 011.414-1.414l2.829 2.828 2.829-2.828a1 1 0 011.414 1.414l-2.828 2.829 2.828 2.829z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-black">
              As the golden rays of the setting sun embrace the earth, a serene
              scene unfolds before your eyes. Nestled amidst a lush forest, a
              picturesque lake glistens like a mirror, reflecting the ethereal
              beauty of the surrounding landscape. The tranquil waters gently
              lap against the shore, creating a soothing symphony that
              harmonizes with the whispers of the wind rustling through the
              trees.
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
      {/* <VideoPopup open={open} setOpen={setOpen} /> */}
      {/* {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white  rounded-lg relative lg:w-[50%]">
            <button
              className="absolute top-2 right-2 z-10 text-white"
              onClick={() => {
                setIsOpen(false);
                setAudio(true);
              }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.348 14.849a1 1 0 01-1.414 1.414l-2.829-2.828-2.829 2.828a1 1 0 11-1.414-1.414l2.828-2.829L6.293 8.878a1 1 0 011.414-1.414l2.829 2.828 2.829-2.828a1 1 0 011.414 1.414l-2.828 2.829 2.828 2.829z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="aspect-w-16 aspect-h-9 rounded-md">
              <video
                className="rounded-md"
                src="/assets/State.mp4"
                controls
                autoPlay
              ></video>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};
