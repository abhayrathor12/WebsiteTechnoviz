const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      <style>{`
        .wave-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(15, 163, 163, 0.3) 0%,
            transparent 70%
          );
          opacity: 0.4;
          transform: translateX(-50%) rotate(45deg);
          animation: waveAnimation 15s infinite linear;
        }
        .wave1 {
          animation-duration: 12s;
          background: radial-gradient(
            circle at center,
            rgba(13, 110, 253, 0.3) 0%,
            transparent 70%
          );
        }
        .wave2 {
          animation-duration: 18s;
          animation-delay: -5s;
          background: radial-gradient(
            circle at center,
            rgba(221, 175, 38, 0.3) 0%,
            transparent 70%
          );
        }
        .wave3 {
          animation-duration: 22s;
          animation-delay: -10s;
        }
        @keyframes waveAnimation {
          0% {
            transform: translateX(-50%) rotate(45deg) translateY(0);
          }
          100% {
            transform: translateX(-50%) rotate(45deg) translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default WaveBackground;