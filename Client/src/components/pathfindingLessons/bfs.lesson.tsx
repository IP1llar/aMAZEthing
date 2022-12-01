import { useEffect, useState, useRef} from "react";
import "../../css/bfs-lesson.css";
import { Tree, Graph } from "../../utils/TreeVisual/Tree-canvas";
function BFSLesson() {
  const [graph,setGraph] = useState<Graph>()
  const ref = useRef(null);
  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 15; i++) {
        t.add();
      }
      t.bfs();
      t.calculateWidthDynamically(ref.current.offsetWidth);
      t.linesWithoutWeights();
      t.getNodes();
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
      setGraph(g);
     
    }
    TreeVisual();
  }, []);
  
  async function bfs(){
    await graph?.printPath(await graph?.bfs());
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper bfs">
      <div ref={ref} id="myCanvas"></div>
      <div className="but-options">
        <button onClick={bfs}>BFS</button>
      </div>
    </div>
  );
}

export default BFSLesson;
