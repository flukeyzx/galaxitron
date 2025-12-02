const GalaxyBackground = () => {
  const customStyles = `
    .galaxy-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        overflow: hidden;
        background: linear-gradient(135deg, #0f1c30 0%, #02040a 50%, #0f121d 100%);
    }

    @keyframes breathe {
        0% { opacity: 0.7; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes drift {
        from { transform: translateY(0px); }
        to { transform: translateY(-100px); }
    }

    .stars-small {
        width: 1.5px;
        height: 1.5px;
        background: transparent;
        box-shadow: 
          10vw 15vh white, 30vw 60vh white, 60vw 10vh white,
          90vw 80vh white, 15vw 85vh white, 45vw 45vh white, 75vw 25vh white,
          85vw 5vh white, 5vw 40vh white, 50vw 90vh white, 12vw 8vh white,
          25vw 18vh white, 38vw 5vh white, 55vw 15vh white, 68vw 8vh white,
          82vw 22vh white, 95vw 12vh white, 4vw 65vh white, 18vw 55vh white,
          35vw 75vh white, 52vw 65vh white, 62vw 85vh white, 78vw 92vh white,
          92vw 65vh white, 22vw 95vh white, 42vw 88vh white, 8vw 12vh white,
          14vw 70vh white, 28vw 82vh white, 33vw 48vh white, 41vw 32vh white,
          57vw 93vh white, 63vw 27vh white, 70vw 58vh white, 79vw 12vh white,
          97vw 42vh white, 11vw 50vh white, 19vw 22vh white, 24vw 72vh white,
          39vw 88vh white, 46vw 10vh white, 58vw 20vh white, 73vw 39vh white,
          87vw 55vh white, 93vw 78vh white, 98vw 95vh white;
        animation: breathe 8s ease-in-out infinite alternate;
    }

    .stars-medium {
        width: 2.6px;
        height: 2.6px;
        background: transparent;
        opacity: 0.6;
        box-shadow: 
          20vw 25vh #a5b4fc, 55vw 75vh #a5b4fc, 85vw 15vh #a5b4fc,
          10vw 90vh #a5b4fc, 40vw 20vh #a5b4fc, 5vw 10vh #a5b4fc,
          32vw 35vh #a5b4fc, 65vw 45vh #a5b4fc, 92vw 35vh #a5b4fc,
          15vw 55vh #a5b4fc, 48vw 65vh #a5b4fc, 72vw 85vh #a5b4fc,
          88vw 95vh #a5b4fc, 28vw 5vh #a5b4fc, 25vw 18vh white, 38vw 5vh white,
          55vw 15vh white, 68vw 8vh white, 82vw 22vh white, 95vw 12vh white,
          4vw 65vh white, 18vw 55vh white, 35vw 75vh white, 52vw 65vh white,
          62vw 85vh white, 78vw 92vh white, 92vw 65vh white, 22vw 95vh white,
          42vw 88vh white, 7vw 45vh #a5b4fc, 13vw 12vh #a5b4fc,
          29vw 62vh #a5b4fc, 34vw 82vh #a5b4fc, 44vw 29vh #a5b4fc,
          59vw 50vh #a5b4fc, 67vw 78vh #a5b4fc, 81vw 33vh #a5b4fc,
          94vw 20vh #a5b4fc, 16vw 40vh #a5b4fc, 22vw 75vh #a5b4fc,
          37vw 56vh #a5b4fc, 47vw 92vh #a5b4fc, 66vw 12vh #a5b4fc,
          71vw 70vh #a5b4fc, 86vw 50vh #a5b4fc, 96vw 33vh #a5b4fc,
          18vw 28vh white, 54vw 82vh white, 83vw 97vh white;
        animation: breathe 12s ease-in-out infinite alternate;
    }

    .drift-slow {
        animation: drift 100s linear infinite;
    }
    
    .drift-medium {
        animation: drift 140s linear infinite;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>

      <div className="galaxy-wrapper">
        <div
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vh] bg-[radial-gradient(circle,rgba(56,189,248,0.4)_0%,transparent_60%)] blur-[80px] mix-blend-screen"
          style={{ animation: "breathe 8s ease-in-out infinite alternate" }}
        ></div>

        <div
          className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vh] bg-[radial-gradient(circle,rgba(99,102,241,0.35)_0%,transparent_60%)] blur-[90px] mix-blend-screen"
          style={{
            animation: "breathe 12s ease-in-out infinite alternate-reverse",
          }}
        ></div>

        <div className="drift-slow">
          <div className="stars-small"></div>
        </div>
        <div className="drift-medium">
          <div className="stars-medium"></div>
        </div>
      </div>
    </>
  );
};

export default GalaxyBackground;
