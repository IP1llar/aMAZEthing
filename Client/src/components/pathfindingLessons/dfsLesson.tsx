import { useEffect, useState, useRef} from "react";
import "../../css/dfs-lesson.css";
import { Tree, Graph } from "../../utils/path-finding-learning-logic";
function DfsLesson() {
  const [graph,setGraph] = useState<Graph>()
  const ref = useRef(null);

  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 40; i++) {
        t.add();
      }
      t.bfs();
      t.calculateWidthDynamically(ref.current.offsetWidth);
      t.createLines();
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
      
      <div ref={ref} id="myCanvas"></div>
      <div className="but-options">
        <button onClick={dfs}>DFS</button>
      </div>
    </div>
  );
}

export default DfsLesson;
