import { value } from "../graph";

const cheatPosX: number[][] = [[350], [300, 400], [250, 350, 450], [200, 300, 400, 500], [150, 250, 350, 450, 550], [100, 200, 300, 400, 500, 600], [50, 150, 250, 350, 450, 550, 650], [0, 100, 200, 300, 400, 500, 600]];
function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
}
class Node {
    value: number;
    children: any;
    adjacencies: {
        0: number,
        1: Node
    }[]
    constructor(value: number) {
        this.value = value;
        this.children = [];
        this.adjacencies = []
    }
    setAdjacent(idLine: number, node: Node) {
        this.adjacencies.push({
            0: idLine,
            1: node
        })
    }
    getChildren() {
        return this.children;
    }
}

export class Tree {
    root: any;
    depth: number;
    numNodes: number;
    totalLines: number;
    lineStructure:any[];
    nodes: any;
    constructor() {
        this.root = null;
        this.depth = 0;
        this.numNodes = 0;
        this.totalLines = 0;
        this.nodes = [];
        this.lineStructure=[]
    }
    getLineStructure(){
        return this.lineStructure;
    }
    getArrNodes() {
        return this.nodes;
    }
    getNodes(arr: any = [[this.root]], currentDepth: number = 0) {
        if (currentDepth + 1 === this.depth) return arr;
        let arr2 = collectNodes(arr, currentDepth);
        currentDepth++;
        arr.push(arr2);
        this.nodes = [...arr];
        this.getNodes(arr, currentDepth);

        function collectNodes(arr: any, currentDepth: number) {
            let res = []
            for (let node of arr[currentDepth]) {
                for (let child of node.children) {
                    res.push(child);
                }
            }
            return res;
        }
    }
    getRoot() {
        if (this.root) return this.root;
    }
    getDepth() {
        return this.depth;
    }
    getTotalLines() {
        return this.totalLines;
    }
    getNumNodes() {
        return this.numNodes;
    }
    add() {

        if (this.root == null) {
            document.getElementById("myCanvas")!.innerHTML = "";
            this.numNodes++;
            const newNode = new Node(this.numNodes);
            this.root = newNode;
            this.depth = 1;
        } else {
            let node = this.root
            function evalChildren(node: Node, numNodes: number) {
                let trigger = false
                if (node.children.length < 2) {
                    const newNode = new Node(numNodes + 1);
                    node.children.push(newNode)
                    return true
                } else {
                    while (!trigger) {
                        node.children.forEach((el: Node) => {
                            if (trigger) return true
                            if (Math.floor(Math.random() * 10) > 0) {//short number= longest display / long number = short display
                                trigger = evalChildren(el, numNodes);
                            }
                        })
                    }

                }

                return trigger

            }
            if (evalChildren(node, this.numNodes)) this.numNodes++
        }
    }
    bfs() {
        const queue: any = [];
        document.getElementById("myCanvas")!.innerHTML += `<div id='tree-level${this.depth}' class='tree-level'></div>`;
        document.getElementById(`tree-level${this.depth}`)!.innerHTML += `<svg class="svg-circle"><circle cx="50%" cy="50%" r="20" stroke="#1B432E" stroke-width="3" fill="#6EAC64"  id="${this.root.value}" ></circle></svg>`
        this.root.children.forEach((el: any) => {
            queue.push(el);
        })
        this.depth++;
        this.depth = bfsVisual(queue, this.depth) - 1;
        function bfsVisual(queue: any, depth: any) {
            let newQ: any = [];
            document.getElementById("myCanvas")!.innerHTML += `<div id='tree-level${depth}' class='tree-level'></div>`;
            for (let node of queue) {
                document.getElementById(`tree-level${depth}`)!.innerHTML += `<svg class="svg-circle"><circle cx="50%" cy="50%" r="20" stroke="#1B432E" stroke-width="3" fill="#6EAC64"  id="${node.value}" ></circle></svg>`
                // document.getElementById(`tree-level${depth}`)!.innerHTML += `<div class='dot' id="${node.value}" onClick={console.log(${node.value})}></div>`
                node.children.forEach((child: any) => {
                    newQ.push(child);
                });
            }
            depth++;
            if (newQ.length !== 0) depth = bfsVisual(newQ, depth);
            return depth
        }
    }

    linesWithoutWeights(currentDepth: number = 0, currentLevel: number = 1, lineID: number = 100) {

        if (currentLevel < this.depth) {
            let collection = document.getElementById(`tree-level${currentLevel}`)!.children
            for (let i = 0; i < collection.length; i++) {
                let collectionBLW = document.getElementById(`tree-level${currentLevel + 1}`)!.children
                let posx0 = cheatPosX[collection.length - 1][i];
                let posy0 = (currentDepth * 100) + 50;
                for (let j = 0; j < collectionBLW.length; j++) {
                    let posx1 = cheatPosX[collectionBLW.length - 1][j];
                    let posy1 = ((currentLevel) * 100) + 50;
                    document.getElementById(`myCanvas`)!.innerHTML += `<svg class="svg-line"><line id="${lineID}" x1="${posx0}" y1="${posy0}" x2="${posx1}" y2="${posy1}"  style="stroke:black;stroke-width:2" /></svg>`
                    lineID++
                }
            }
            this.totalLines = lineID;
            this.linesWithoutWeights(currentDepth + 1, currentLevel + 1, lineID)
        }
    }
    linesWithWeights(currentDepth: number = 0, currentLevel: number = 1, lineID: number = 100){
        if (currentLevel < this.depth) {
            let collection = document.getElementById(`tree-level${currentLevel}`)!.children
            for (let i = 0; i < collection.length; i++) {
                let collectionBLW = document.getElementById(`tree-level${currentLevel + 1}`)!.children
                let posx0 = cheatPosX[collection.length - 1][i];
                let posy0 = (currentDepth * 175) + 50;
                for (let j = 0; j < collectionBLW.length; j++) {
                    let posx1 = cheatPosX[collectionBLW.length - 1][j];
                    let posy1 = ((currentLevel) * 175) + 50;
                    let flag = false;
                    let weight = 0;
                    while(!flag){
                        weight = Math.floor(Math.random()*7);
                        if(weight>1) flag=true;
                        if(weight===3||weight===5||weight===7) weight--;
                    }
                    document.getElementById(`myCanvas`)!.innerHTML += `<svg class="svg-line"><line id="${lineID}" x1="${posx0}" y1="${posy0}" x2="${posx1}" y2="${posy1}"  style="stroke:black;stroke-width:${weight}" /></svg>`
                    this.lineStructure.push({id:lineID,weight:weight})
                    lineID++
                }
            }
            this.totalLines = lineID;
            this.linesWithWeights(currentDepth + 1, currentLevel + 1, lineID)
        }
    }
}

export class Graph {
    vertices: any = [];
    constructor(node: Node, depth: number, lines: any) {
        this.vertices = [];
        if(typeof lines === 'number') this.createVertices(node, depth, lines);
        else this.createVerticesWeights(node, depth, lines);
    }
    getVertices() {
        return this.vertices
    }
    createVerticesWeights(nodesArr: any, depth: number, obj: any, currentDepth: number = 0, currentLine: any = 100, created: boolean = false, nodesVisited = 0) {
        if (currentDepth + 1 === depth) {
            // console.log(this.vertices)
            return
        }

        if (!created) {
            for (let i = 0; i < nodesArr.length; i++) {
                for (let node of nodesArr[i]) {
                    let cell = new Cell(node.value);
                    this.vertices.push(cell);
                }
            }
            created = true;
        }
        let nodesPrevLvl = nodesVisited;
        let nodesXlevel = nodesArr[currentDepth].length;
        let nodesNextLevel = nodesArr[currentDepth + 1].length;
        // console.log({ nodesVisited, nodesXlevel, nodesNextLevel })

        for (let i = nodesVisited; i < nodesXlevel + nodesPrevLvl; i++) {
            let source = this.vertices[i];
            // console.log(`node number ${source.id}`)
            for (let j = nodesPrevLvl + nodesXlevel; j < nodesPrevLvl + nodesNextLevel + nodesXlevel; j++) {
                let destination = this.vertices[j]

                let line = new Line(obj[currentLine-100].id,obj[currentLine-100].weight)
                this.setConnection(source, destination, line);
                currentLine++
                // console.log(`connection from ${source.id} to${destination.id}`)
            }
            nodesVisited++
        }
        currentDepth++;
        this.createVerticesWeights(nodesArr, depth, obj, currentDepth, currentLine, created, nodesVisited)
    }

    createVertices(nodesArr: any, depth: number, totalLines: number, currentDepth: number = 0, currentLine: number = 100, created: boolean = false, nodesVisited = 0) {
        if (currentDepth + 1 === depth) {
            // console.log(this.vertices)
            return
        }
        if (!created) {
            for (let i = 0; i < nodesArr.length; i++) {
                for (let node of nodesArr[i]) {
                    let cell = new Cell(node.value);
                    this.vertices.push(cell);
                }
            }
            created = true;
        }
        let nodesPrevLvl = nodesVisited;
        let nodesXlevel = nodesArr[currentDepth].length;
        let nodesNextLevel = nodesArr[currentDepth + 1].length;
        // console.log({ nodesVisited, nodesXlevel, nodesNextLevel })

        for (let i = nodesVisited; i < nodesXlevel + nodesPrevLvl; i++) {
            let source = this.vertices[i];
            // console.log(`node number ${source.id}`)
            for (let j = nodesPrevLvl + nodesXlevel; j < nodesPrevLvl + nodesNextLevel + nodesXlevel; j++) {
                let destination = this.vertices[j]
                let line = new Line(currentLine,1)
                this.setConnection(source, destination, line);
                currentLine++
                // console.log(`connection from ${source.id} to${destination.id}`)
            }
            nodesVisited++
        }
        currentDepth++;

        this.createVertices(nodesArr, depth, totalLines, currentDepth, currentLine, created, nodesVisited)
    }

    setConnection(source: any, destination: any, line: Line) {
        source.setAdjacent(destination, line);
        destination.setAdjacent(source, line);
    }

    async dfs(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: {id:0,weight:0}, 1: this.vertices[0] }]) {
        let neighbors = currentPos.getAdjacencies()
        let res = checkNeighbors(neighbors, end)
        if (res[0]) return path.concat(res[1])
        for (let neighbor of neighbors) {
            let visitedFlag = false;
            for (let visited of path) {
                if (neighbor['1'].id === visited['1'].id) {
                    visitedFlag = true;
                    break;
                }
            }
            // console.log(neighbor)
            if (visitedFlag === true) continue;
            let search: any = await this.dfs(neighbor['1'], end, path.concat(neighbor));
            if (search) return search;

        }

        return false;
        function checkNeighbors(neighbors: any, end: any) {
            // console.log({neighbors})
            for (let neighbor of neighbors) {
                // console.log(`${neighbor['1'].id} compared to ${end.id}`)
                if (neighbor['1'].id === end.id) return [true, [neighbor]]
            }
            return [false, null]
        }
    }
    async printPath(path: any) {
        document.getElementById(`${path[0]['1'].id}`)!.style.fill = 'yellow';
        path.shift()

        for (let el of path) {
            await delay(500);
            document.getElementById(`${el['0'].id}`)!.style["stroke"] = 'beige';
            await delay(500);
            document.getElementById(`${el['1'].id}`)!.style.fill = 'yellow';
        }
    }

    async bfs(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: {id:0,weight:0}, 1: this.vertices[0] }], depth = 0) {
        let q = [];
        let found = false;
        let count=0
        q.unshift({'0':0,'1':currentPos});
        while (q.length && !found&&count<100) {
            count++
            let node = q.pop();
            let neighbors:any = node['1'].adjacencies;
            console.log(neighbors)
            for (let neighbor of neighbors) {
                let visitedFlag = false;
                for (let visited of path) {
                    if (neighbor['1'].id === visited['1'].id) {
                        visitedFlag = true;
                    }
                }
                if (visitedFlag === true) continue;
                q.unshift(neighbor)
                console.log('here')
                path.push(neighbor)
                if (neighbor['1'].id === end.id) {
                    found = true;
                }
            }
        }
        return path;
    }


    async dijkstra(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: {id:0,weight:0}, 1: this.vertices[0] }]){
        console.log(this.vertices)
        let count = 0;
        let unvisitedNodes:{[key: value]: number} = {};
        let visitedNodes:{[key: value]: number} = {};
        for (let vertex of this.vertices) {
            if (vertex === currentPos) unvisitedNodes[currentPos.id] = 0;
            else unvisitedNodes[vertex.id] = Infinity;
        }
        console.log('FIRST STAGE',unvisitedNodes);
        while(Object.keys(unvisitedNodes).length&&count<50){
            count++
            let node = Object.keys(unvisitedNodes).reduce((acc, key) => {
                return unvisitedNodes[key] < acc[1] ? [key, unvisitedNodes[key]] : acc;
              }, ['null', Infinity]);
            
            visitedNodes[node[0]] = unvisitedNodes[node[0]];//returning the first object not visited
            console.log(node, visitedNodes, unvisitedNodes);
            console.log(`Comparing ${node[0]} to ${end.id}`);
            if (node[0] == end.id) break;
            if (node[1] === Infinity) return false;
            let neighbors = currentPos.adjacencies;
            for (let neighbor of neighbors) {
                let weight = neighbor['0'].weight;
                let sum = unvisitedNodes[node[0]] + (weight as number);
                if (sum < unvisitedNodes[neighbor['0'].weight]) unvisitedNodes[neighbor['1'].id] = sum;
            }
            delete unvisitedNodes[node[0]];
         }
         console.log('herereeee',visitedNodes,count)
    }
}


class Cell {
    id: number;
    adjacencies: {
        0: Line,
        1: Cell
    }[];
    constructor(id: number) {
        this.id = id;
        this.adjacencies = [];
    }
    getAdjacencies() {
        let shuffledAdj = Array(this.adjacencies.length).fill(null);
        for (let i = 0; i < shuffledAdj.length; i++) {
            let index = Math.floor(Math.random() * shuffledAdj.length);
            while (shuffledAdj[index] !== null) {
                index = Math.floor(Math.random() * shuffledAdj.length);
            }
            shuffledAdj[index] = this.adjacencies[i];
        }
        return shuffledAdj;
    }
    setAdjacent(node: any, line: Line) {
        this.adjacencies.push({
            '0': line,
            '1': node
        });
    }
}

class Line{
    id:number;
    weight: number;
    constructor(id:number,weight:number){
        this.id = id;
        this.weight = weight;
    }

}
