"use client"
import React, { FC, useRef, useEffect, useState, ReactNode } from 'react';
import { Map, Marker, useMap } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

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

};

const AnimatedMapContent: FC<{
  latitude: number;
  longitude: number;
  zoom: number;
  autoAnimate: boolean;
  animationDuration: number;
  viewAngle: number;
}> = ({ latitude, longitude, zoom, autoAnimate, animationDuration, viewAngle }) => {
  const { current: map } = useMap();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!map || !autoAnimate) return;

    const startAnimation = () => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      
      // First, zoom in closer to the pin with side angle
      map.easeTo({
        center: [longitude, latitude],
        zoom: zoom + 3,
        pitch: viewAngle, // Use custom view angle
        bearing: 0,
        duration: 2000,
        easing: (t: number) => t * (2 - t) // Ease out quad
      });

      // After zoom completes, start rotation
      setTimeout(() => {
        startRotation();
      }, 2000);
    };

    const startRotation = () => {
      let startTime: number;
      const rotationSpeed = 360 / (animationDuration * 5400); // degrees per millisecond
      let currentBearing = 0;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        currentBearing = (elapsed * rotationSpeed) % 360;
        
        map.rotateTo(currentBearing, {
          duration: 400, // Smoother rotation with longer duration
          easing: (t: number) => t,
          pitch: viewAngle // Maintain view angle during rotation
        });

        // Continue animation indefinitely (continuous rotation)
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after component mounts
    const timer = setTimeout(startAnimation, 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [map, autoAnimate, latitude, longitude, zoom, animationDuration, isAnimating, viewAngle]);

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
  animationDuration = 30, // seconds for one complete rotation (slower)
  viewAngle = 45 // degrees: 0 = top-down, 60 = max side view
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isManualAnimating, setIsManualAnimating] = useState(false);
  const mapRef = useRef<any>(null);
  const manualAnimationRef = useRef<NodeJS.Timeout | null>(null);

  const handleManualAnimation = () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    if (isManualAnimating) {
      // Stop animation
      if (manualAnimationRef.current) {
        clearInterval(manualAnimationRef.current);
        manualAnimationRef.current = null;
      }
      setIsManualAnimating(false);
      // Reset to original view
      map.easeTo({
        center: [longitude, latitude],
        zoom: zoom,
        bearing: 0,
        pitch: 0,
        duration: 1500
      });
      return;
    }

    setIsManualAnimating(true);

    // Zoom in with angle
    map.easeTo({
      center: [longitude, latitude],
      zoom: zoom + 4,
      pitch: viewAngle,
      bearing: 0,
      duration: 1500
    });

    // Start continuous rotation after zoom
    setTimeout(() => {
      let bearing = 0;
      manualAnimationRef.current = setInterval(() => {
        bearing = (bearing + 0.5) % 360; // Slower rotation (0.5 degrees per interval)
        map.rotateTo(bearing, { 
          duration: 100,
          pitch: viewAngle
        });
      }, 50); // Update every 50ms
    }, 1500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (manualAnimationRef.current) {
        clearInterval(manualAnimationRef.current);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude,
          longitude,
          zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/streets-v12"}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
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
        />
        
        {/* Location Pin */}
        <Marker
          latitude={latitude}
          longitude={longitude}
          anchor="center"
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50% 50% 50% 0',
              backgroundColor: pinColor,
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transform: 'rotate(-45deg)',
              cursor: 'pointer',
              position: 'relative',
              animation: 'pulse 2s infinite'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                width: '8px',
                height: '8px',
                backgroundColor: 'white',
                borderRadius: '50%'
              }}
            />
          </div>
        </Marker>
        
        {/* Optional: Add popup */}
        {showPopup && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              fontSize: '14px',
              fontWeight: '500',
              zIndex: 1
            }}
          >
            {popupText}
          </div>
        )}
      </Map>
      
      {/* Animation Control Button */}
      {showControls && (
        <button
          onClick={handleManualAnimation}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: isManualAnimating ? 'rgba(255,0,0,0.8)' : 'rgba(0,0,0,0.8)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = isManualAnimating ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = isManualAnimating ? 'rgba(255,0,0,0.8)' : 'rgba(0,0,0,0.8)';
          }}
        >
          {isManualAnimating ? '⏹️ Stop' : '🎯 Animate'}
        </button>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 ${pinColor}40;
          }
          70% {
            box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 10px rgba(255,0,0,0);
          }
          100% {
            box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(255,0,0,0);
          }
        }
      `}</style>
    </div>
  );
};

export default MapSinglePointComponent;