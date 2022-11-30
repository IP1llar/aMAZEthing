import { useEffect, useState } from "react";
import "../../css/dijkstra-lesson.css";
import { Tree, Graph } from "../../utils/TreeVisual/Tree-canvas";
function DIJKSTRALesson() {
  const [graph,setGraph] = useState<Graph>()

  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 12; i++) {
        t.add();
      }
      t.bfs();
      t.linesWithWeights();
      t.getNodes();
      console.log(t.getLineStructure())
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getLineStructure());
      setGraph(g);
    }
    TreeVisual();
  }, []);
  async function dijkstra(){
    await graph?.printPath(await graph?.dijkstra());
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper dijk">
      
      <div id="myCanvas"></div>
      <div className="but-options">
        <button onClick={dijkstra}>Dijkstra</button>
      </div>
    </div>
  );
}

export default DIJKSTRALesson;
