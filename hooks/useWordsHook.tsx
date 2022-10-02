import React from "react";
const useWordshook = (wordList: string[]) => {
  const [words, setWords] = React.useState<string[]>(wordList);
  const addWord = (str: string) => {
    setWords((prev) => [...prev, str]);
  };
  const deleteWord = (idx: number) => {
    setWords((prev) => {
      prev.splice(idx, 1);
      return [...prev];
    });
  };

  return { words, addWord, deleteWord };
};
export default useWordshook;
