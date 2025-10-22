"use client";
import React, { FC, useRef, useEffect, useState, ReactNode } from "react";
import { Map, Marker, Popup, useMap } from "react-map-gl/mapbox";
import { useInView } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapSinglePointComponent.module.css";
import Image from "next/image";


const openInMaps = (lat: number, lng: number) => {
  const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
  const url = isApple
    ? `https://maps.apple.com/?daddr=${lat},${lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, "_blank");
};



type MapSinglePointComponentProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
  pinColor?: string;
  showPopup?: boolean;
  popupText?: string;
  autoAnimate?: boolean;
  animationDuration?: number;
  viewAngle?: number;
  controls?: ReactNode;
  mapboxToken: string;
  mapboxStyle: string;
};

const AnimatedMapContent: FC<{
  latitude: number;
  longitude: number;
  zoom: number;
  autoAnimate: boolean;
  animationDuration: number;
  viewAngle: number;
  isInView: boolean;
}> = ({
  latitude,
  longitude,
  zoom,
  autoAnimate,
  animationDuration,
  viewAngle,
  isInView,
}) => {
  const { current: map } = useMap();
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!map || !autoAnimate || !isInView) return;

    let timeout: NodeJS.Timeout;

    const startRotation = () => {
      let startTime: number | null = null;
      const rotationSpeed = 360 / (animationDuration * 1000);
      let currentBearing = 0;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        currentBearing = (elapsed * rotationSpeed) % 360;

        map.rotateTo(currentBearing, {
          duration: 400,
          easing: (t: number) => t,
          pitch: viewAngle,
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Delay rotation slightly so fitBounds/zoom finishes first
    timeout = setTimeout(startRotation, 2500);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [map, autoAnimate, isInView, latitude, longitude, zoom, animationDuration, viewAngle]);

  return null;
};

const MapSinglePointComponent: FC<MapSinglePointComponentProps> = ({
  latitude,
  longitude,
  zoom = 18,
  pinColor = "#494de0",
  showPopup = false,
  popupText = "Location",
  autoAnimate = true,
  animationDuration = 30,
  viewAngle = 45,
  controls,
  mapboxToken,
  mapboxStyle,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isManualAnimating, setIsManualAnimating] = useState(false);
  const mapRef = useRef<any>(null);
  const manualAnimationRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activePopup, setActivePopup] = useState<null | "pin1" | "pin2">(null);

  const handleManualAnimation = () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    if (isManualAnimating) {
      if (manualAnimationRef.current) {
        clearInterval(manualAnimationRef.current);
        manualAnimationRef.current = null;
      }
      setIsManualAnimating(false);
      map.easeTo({
        center: [longitude, latitude],
        zoom,
        bearing: 0,
        pitch: 0,
        duration: 2000,
      });
      return;
    }

    setIsManualAnimating(true);
    map.easeTo({
      center: [longitude, latitude],
      zoom: zoom + 5,
      pitch: viewAngle,
      bearing: 0,
      duration: 300,
    });

    setTimeout(() => {
      let bearing = 0;
      manualAnimationRef.current = setInterval(() => {
        bearing = (bearing + 0.6) % 360;
        map.rotateTo(bearing, { duration: 100, pitch: viewAngle });
      }, 50);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (manualAnimationRef.current) clearInterval(manualAnimationRef.current);
    };
  }, []);

  const point2 = [-117.94009, 34.090733];

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        ref={mapRef}
        initialViewState={{ latitude, longitude, zoom }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapboxStyle || "mapbox://styles/mapbox/streets-v12"}
        mapboxAccessToken={mapboxToken}
        onLoad={() => {
          const map = mapRef.current?.getMap();
          if (!map) return;

          const point1: [number, number] = [longitude, latitude];
          const point2: [number, number] = [-117.94009, 34.090733];

          const bounds = [
            [Math.min(point1[0], point2[0]), Math.min(point1[1], point2[1])],
            [Math.max(point1[0], point2[0]), Math.max(point1[1], point2[1])],
          ];

          // 👇 Adjust padding based on device width
          const isMobile = window.innerWidth < 768;
          map.fitBounds(bounds, {
            padding: isMobile ? 60 : 200, // smaller padding for phones
            duration: 1500,
          });
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Animation */}
        <AnimatedMapContent
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          autoAnimate={autoAnimate}
          animationDuration={animationDuration}
          viewAngle={viewAngle}
          isInView={isInView}
        />

        {/* Pin 1 */}
        <Marker latitude={latitude} longitude={longitude} anchor="center">
          <img
            src="/assets/gifs/MdfPin.gif"
            alt="Pin 1"
            onClick={() => setActivePopup(activePopup === "pin1" ? null : "pin1")}
            style={{
              width: "200px",
              height: "200px",
              cursor: "pointer",
              pointerEvents: "auto", // allow tapping
            }}
          />
          {activePopup === "pin1" && (
            <Popup
              latitude={latitude}
              longitude={longitude}
              closeOnClick={false}
              closeButton={false}
              onClose={() => setActivePopup(null)}
              offset={[0, -50]} // move popup above the pin
            >
              <div style={{ fontSize: "13px", fontWeight: "500", padding: '1rem', color: 'black' }}>
                 22219 Avalon Blvd.<br />
                 Carson CA. <br />
                 {/* <button
                  onClick={() => openInMaps(latitude, longitude)}
                  style={{
                    marginTop: "8px",
                    background: "#007AFF",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Drive
                </button> */}

                <div
                 onClick={() => openInMaps(33.82496,-118.26407)}
                 style={{ width: '2rem', height: '2rem', position: 'relative', cursor: 'pointer', marginTop: '1rem' }}
                >
                  <Image src="./assets/svgs/icons/route.svg" alt="" fill/>
                </div>

              </div>
            </Popup>
          )}
        </Marker>

        {/* Pin 2 */}
        <Marker latitude={point2[1]} longitude={point2[0]} anchor="center">
          <img
            src="/assets/gifs/MdfPin.gif"
            alt="Pin 2"
            onClick={() => setActivePopup(activePopup === "pin2" ? null : "pin2")}
            style={{
              width: "200px",
              height: "200px",
              cursor: "pointer",
              pointerEvents: "auto", // allow tapping
            }}
          />
          {activePopup === "pin2" && (
            <Popup
              latitude={point2[1]}
              longitude={point2[0]}
              closeOnClick={false}
              onClose={() => setActivePopup(null)}
              closeButton={false}
              offset={[0, -50]}
            >
              <div style={{ fontSize: "13px", fontWeight: "500", padding: '1rem', color: 'black' }}>
                1773 W San Bernardino Rd. <br />
                W. Covina CA. <br />
                <div
                 onClick={() => openInMaps(point2[1],point2[0])}
                 style={{ width: '2rem', height: '2rem', position: 'relative', cursor: 'pointer', marginTop: '1rem' }}
                >
                  <Image src="./assets/svgs/icons/route.svg" alt="" fill/>
                </div>
              </div>
            </Popup>
          )}
        </Marker>
        {showPopup && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              fontSize: "14px",
              fontWeight: "500",
              zIndex: 1,
            }}
          >
            {popupText}
          </div>
        )}

        {controls && (
          <div className={styles.controlsContainer}>
            {controls}
          </div>
        )}
      </Map>

      {showControls && (
        <button
          onClick={handleManualAnimation}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: isManualAnimating
              ? "rgba(255,0,0,0.8)"
              : "rgba(0,0,0,0.8)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "12px",
            zIndex: 1000,
            transition: "all 0.3s ease",
          }}
        >
          {isManualAnimating ? "⏹️ Stop" : "🎯 Animate"}
        </button>
      )}
    </div>
  );
};

export default MapSinglePointComponent;
