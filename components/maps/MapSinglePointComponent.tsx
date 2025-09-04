"use client";
import React, { FC, useRef, useEffect, useState, ReactNode } from "react";
import { Map, Marker, useMap } from "react-map-gl/mapbox";
import { useInView } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from './MapSinglePointComponent.module.css'

type MapSinglePointComponentProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
  pinColor?: string;
  showPopup?: boolean;
  popupText?: string;
  autoAnimate?: boolean;
  animationDuration?: number;
  viewAngle?: number; // 0 = top-down, 60 = max side angle
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
}> = ({ latitude, longitude, zoom, autoAnimate, animationDuration, viewAngle, isInView }) => {
  const { current: map } = useMap();
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!map || !autoAnimate || !isInView) return;

    let timeout: NodeJS.Timeout;

    const startRotation = () => {
      let startTime: number | null = null;
      const rotationSpeed = 360 / (animationDuration * 1000); // degrees/ms
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

    const startAnimation = () => {
      map.easeTo({
        center: [longitude, latitude],
        zoom: zoom + 3,
        pitch: viewAngle,
        bearing: 0,
        duration: 2000,
        easing: (t: number) => t * (2 - t),
      });

      timeout = setTimeout(startRotation, 2000);
    };

    // Start once visible
    startAnimation();

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
  zoom = 14,
  pinColor = "#494de0",
  showPopup = false,
  popupText = "Location",
  autoAnimate = true,
  animationDuration = 30,
  viewAngle = 45,
  controls,
  mapboxToken,
  mapboxStyle
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isManualAnimating, setIsManualAnimating] = useState(false);
  const mapRef = useRef<any>(null);
  const manualAnimationRef = useRef<NodeJS.Timeout | null>(null);

  // 👇 observe container visibility
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
      zoom: zoom + 4,
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

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        ref={mapRef}
        initialViewState={{ latitude, longitude, zoom }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapboxStyle || "mapbox://styles/mapbox/streets-v12"}
        mapboxAccessToken={mapboxToken}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatedMapContent
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          autoAnimate={autoAnimate}
          animationDuration={animationDuration}
          viewAngle={viewAngle}
          isInView={isInView}
        />

        {/* <Marker latitude={latitude} longitude={longitude} anchor="center">
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50% 50% 50% 0",
              backgroundColor: pinColor,
              border: "3px solid white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transform: "rotate(-45deg)",
              cursor: "pointer",
              position: "relative",
              animation: "pulse 2s infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(45deg)",
                width: "8px",
                height: "8px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </div>
        </Marker> */}

        <Marker latitude={latitude} longitude={longitude} anchor="center">
          <img
            src="/assets/gifs/MdfPin.gif"
            alt="Map Pin"
            style={{
              width: "400px",
              height: "300px",
              transform: "translate(1%, -35%)", // centers pin properly on map point
              cursor: "pointer",
              userSelect: "none",
              pointerEvents: "none", // makes sure map interactions still work
            }}
          />
        </Marker>`


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
          <div
           className={styles.controlsContainer}
          >
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
            background: isManualAnimating ? "rgba(255,0,0,0.8)" : "rgba(0,0,0,0.8)",
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

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 0 ${pinColor}40;
          }
          70% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 10px rgba(255, 0, 0, 0);
          }
          100% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default MapSinglePointComponent;
