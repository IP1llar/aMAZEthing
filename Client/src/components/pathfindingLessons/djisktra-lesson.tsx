import { useEffect, useState } from "react";
import "../../css/dijkstra-lesson.css";
import { Tree, Graph } from "../../utils/TreeVisual/Tree-canvas";
function DIJSKTRALesson() {
  const [graph,setGraph] = useState<Graph>()

  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 10; i++) {
        t.add();
      }
      t.bfs();
      t.linesWithWeights();
      t.getNodes();
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
      setGraph(g);
     
    }
    TreeVisual();
  }, []);
  async function djikstra(){
    await graph?.printPath(await graph?.dfs())
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper">
      
      <div id="myCanvas"></div>
      <div className="but-options">
        <button onClick={djikstra}>Djikstra</button>

      </div>
    </div>
  );
}

export default DIJSKTRALesson;
