const { useState } = require("react");

const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const surpriseOptions = [
    "A blue ostrich eating a melon",
    "A matisse style shark on the telephone",
    "A pineapple sunbathing on an island",
  ];

  const surpriseMe = () => {
    setImages(null);
    const randomIndex = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomIndex]);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError("Error! Must have a search term");
      return;
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:8000/images", options);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description
          <span className="surprise" onClick={surpriseMe}>
            Surprise me
          </span>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="An impressionist oil painting of a sunflower in a purple vase..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generate</button>
        </div>
        {error && <p>{error}</p>}
      </section>
      <section className="image-section">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Generated based on ${value}`}
          />
        ))}
      </section>
    </div>
  );
};

export default App;
