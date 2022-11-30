import { useEffect, useState } from "react";
import "../../css/dfs-lesson.css";
import { Tree, Graph } from "../../utils/TreeVisual/Tree-canvas";
function DFSLesson() {
  const [graph,setGraph] = useState<Graph>()

  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 15; i++) {
        t.add();
      }
      t.bfs();
      t.linesWithoutWeights();
      t.getNodes();
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
      setGraph(g);
     
    }
    TreeVisual();
  }, []);
  async function dfs(){
    await graph?.printPath(await graph?.dfs())
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper dfs">
      
      <div id="myCanvas"></div>
      <div className="but-options">
        <button onClick={dfs}>DFS</button>
      </div>
    </div>
  );
}

export default DFSLesson;
