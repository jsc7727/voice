type WordsProps = {
  words: string[];
  speakIdx: (idx: number) => void;
  selectedIdx: number;
};

const Words = ({ words, speakIdx, selectedIdx }: WordsProps) => {
  const onclickHandler = (idx: number) => {
    speakIdx(idx);
  };
  const selected = (idx: number) => {
    return selectedIdx === idx ? "green" : "white";
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100px",
      }}
    >
      {words.map((v, idx) => {
        return (
          <button
            key={idx}
            style={{ background: selected(idx) }}
            onClick={() => onclickHandler(idx)}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
};
export default Words;
