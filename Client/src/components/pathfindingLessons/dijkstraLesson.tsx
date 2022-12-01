import { useEffect, useState, useRef } from "react";
import "../../css/dijkstra-lesson.css";
import { Tree, Graph } from "../../utils/path-finding-learning-logic";
function DijkstraLesson() {
  const [graph,setGraph] = useState<Graph>()
  const ref:any = useRef(null);
  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 15; i++) {
        t.add();
      }
      t.bfs();
      t.calculateWidthDynamically(ref.current.offsetWidth);
      t.createLines(175,true);//true with weights
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
    <div  className="whole-page-wrapper dijk">
      
      <div ref={ref} id="myCanvas"></div>
      <div className="but-options">
        <button onClick={dijkstra}>Dijkstra</button>
      </div>
    </div>
  );
}

export default DijkstraLesson;
