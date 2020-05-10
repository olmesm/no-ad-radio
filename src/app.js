import "https://unpkg.com/htm@latest";
import "https://unpkg.com/react@latest/umd/react.production.min.js";
import "https://unpkg.com/react-dom@latest/umd/react-dom.production.min.js";

const { createElement, useRef, useState, useEffect } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

const STATIONS_URL = "stations.json";

const Loader = () =>
  html`<div className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;

const Controls = ({ play, pause, isPlaying, isTrackLoaded }) =>
  isPlaying
    ? html`<button onClick=${pause}>Pause</button>`
    : html`<button disabled=${!isTrackLoaded} onClick=${play}>Play</button>`;

const StationsList = ({ handleMedia }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch(STATIONS_URL)
      .then((response) => response.json())
      .then(setStations)
      .catch((e) => {
        throw new Error("unable to fetch the stations", e);
      });
  }, []);

  if (stations.length <= 0) {
    return html`<${Loader} />`;
  }

  return html`
    ${stations.map(
      (station) => html`
        <button key=${station.url} onClick=${() => handleMedia(station)}>
          ${station.name}
        </button>
      `
    )}
  `;
};

const App = () => {
  const elMedia = useRef(null);
  const [station, setStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!station) {
      return;
    }

    elMedia.current.src = station.url;
    elMedia.current.play();
  }, [station]);

  const handleMedia = (_station) => {
    setStation(_station);
  };

  const handlePause = () => {
    elMedia.current.pause();
  };

  const handlePlay = () => {
    elMedia.current.play();
  };

  return html`
    <div>
      <audio
        onPlaying=${() => setIsPlaying(true)}
        onPause=${() => setIsPlaying(false)}
        ref=${elMedia}
        hidden=${true}
      />

      <p>
        <${Controls}
          isPlaying=${!!station}
          play=${handlePlay}
          pause=${handlePause}
          isTrackLoaded=${station && station.url}
          isPlaying=${isPlaying}
        />
        <span>${station && station.name}</span>
      </p>

      <div>
        <${StationsList} handleMedia=${handleMedia} />
      </div>
    </div>
  `;
};

render(html`<${App} />`, document.getElementById("root"));
