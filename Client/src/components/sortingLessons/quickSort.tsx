import "../../css/sorting.css";
import { useEffect, useState } from "react";
import { generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { quickSortVisual } from "../../utils/sorting-helper-visual";
import { quickSortAlgo } from "../../utils/sorting-algo";
import { useAlgo } from "../../features/hooks";
import Pagination from "../learning/pagination";
import StepsPath from "../pathfindingLessons/stepsPath";
import PseudoCode from "./psuedoCode";

export default function QuickLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Check neighbors",
    "Add neighbors into queue",
    "Shift queue and keep checking neighbors",
    "Repeat until it founds last state",
    "Find shortest path",
  ];

  const WIDTH = 27;
  const MIN_VAL = 5;
  const MAX_VAL = 100;
  const NUM_BARS = 20;
  const FONTSIZE = 15
  const DELAY = 10;
  const PADTOP = 5;
  const MARGIN = 1.5;
  const HEIGHT = 2.5;

  const paragraphs = {
    sortName: "Quick sort",
    firstP:
      "Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(useAlgo("quick", copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <Pagination  clicked={clicked} leftName={'Merge'} rightName={'Customize'} leftLink={'learning/mergeLesson'} rightLink={'learning/allSortsPlay'}>
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
          <button
            className={
              clicked ? "button disabled clickSort" : "button clickSort"
            }
            disabled={clicked ? true : false}
            onClick={() => initArr()}
          >
            new array
          </button>

          <button
            className={
              clicked && !isSorted
                ? "button disabled clickSort"
                : isSorted
                ? "button disabled clickSort"
                : "button clickSort"
            }
            disabled={!isSorted && clicked ? true : isSorted ? true : false}
            onClick={() => {
              setClicked(true);
            }}
          >
            visualize
          </button>
        </div>
        <div className="visualRow">
        <PseudoCode steps={steps}></PseudoCode>
        <Visualization
          fontColor={"white"}
          width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          height={HEIGHT}
          array={array}
          key={array as any}
          animations={animations}
          clicked={clicked}
          sortingAlgo={quickSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted} fontSize={FONTSIZE} tower={undefined} isSorted={false}        />
               <StepsPath steps={steps}></StepsPath>
        </div>
      </div>
    </div>
    </Pagination>
  );
}
