
function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 4px solid #0f0f0f; 
          border-top: 4px solid #ffffff; 
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
