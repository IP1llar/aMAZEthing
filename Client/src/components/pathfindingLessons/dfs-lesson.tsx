import { useEffect, useState } from "react";
import "../../css/dfs-lesson.css";
import { Tree, Graph } from "../../utils/TreeVisual/Tree-canvas";
function DFSLesson() {
  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 14; i++) {
        t.add();
      }
      console.log(t);
      t.bfs();
      t.lines();
      t.getNodes();
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
      console.log(g.getVertices())
      let path = g.dfs();
      console.log('shortest path:',path);
      g.printPath(path);
    }
    TreeVisual();
  }, []);

  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper">
      <div id="myCanvas"></div>
    </div>
  );
}

export default DFSLesson;
