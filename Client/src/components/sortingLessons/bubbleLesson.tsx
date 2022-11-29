import '../../css/sorting.css';
import { useEffect, useState } from 'react';
import { bubbleSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { bubbleSortVisual } from '../../utils/sorting-helper-visual';

export default function BubbleLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false)

  let WIDTH = 40
  let MIN_VAL = 3
  let MAX_VAL = 20
  let NUM_BARS = 12
  let DELAY = 10
  let PADTOP = 10
  let MARGIN = 5



  let paragraphs = {
    sortName: 'Bubble sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. Starting on one side, compares adjacent items and keep “bubbling” the larger one to the other side. Worst time complexity O(N^2).',
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(bubbleSortAlgo(copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false)
    setArray((array) => (array = generateArray(NUM_BARS , MIN_VAL, MAX_VAL)));
  }

  return (
    <div className="whole-page-wrapper">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
        {!clicked && 
           < button className="button clickSort" onClick={() => initArr()}>
            new array
          </button>}

          {!clicked &&!isSorted && 
            <button
              className="button clickSort"
              onClick={() => {
                setClicked(true);
              }}
            >
              visualize
            </button>
          }
        </div>
        <Visualization
          width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          key={array}
          animations={animations}
          clicked={clicked}
          sortingAlgo={bubbleSortVisual}
          setClicked={setClicked}
          setIsSorted={ setIsSorted}
        />
      </div>
    </div>
  );
}
