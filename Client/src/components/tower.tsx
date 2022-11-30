import { TowerType } from "../utils/types";
import TowerSVG from "./svg/towerSVG";
import '../css/tower.css'
import TowerPopup from "./towerPopup";

function Tower({ tower, boxSize, setCurrentTile, setCurrentTower, currentTower, setCurrentMinion, width, height, towersSorting }: {
  tower: TowerType,
  boxSize: number,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>,
  currentTower: null | TowerType,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  width: number,
  height: number,
  towersSorting: {[key: number]: number}
} ) {

  function handleContextMenu() {
    if (tower.minion === null) {
      setCurrentTile({
        xPos: tower.xPos,
        yPos: tower.yPos
      })
    }
  }

  function handleClick() {
    setCurrentTower(tower)
    setCurrentMinion(null);
  }

  return (
    <div style={{width: `${boxSize*3}px`, top: `${(tower.yPos-2)*boxSize}px`, left: `${(tower.xPos-1)*boxSize}px`}} className='tower' onContextMenu={handleContextMenu} onClick={handleClick}>
      <TowerSVG playerClass={
                  tower.minion !== null? 'contestedTower' :
                  tower.alignment === 'p1' ? 'p1Tower' :
                  tower.alignment === 'p2' ? 'p2Tower' :
                  'neutralTower'}
                playerClassShadow={
                  tower.minion !== null ? 'contestedTowerShadow' :
                  tower.alignment === 'p1' ? 'p1TowerShadow' :
                  tower.alignment === 'p2' ? 'p2TowerShadow' :
                  'neutralTowerShadow'}
      />
      <TowerPopup towersSorting={towersSorting} boxSize={boxSize} tower={tower} width={width} height={height}/>
    </div>
  )
}

export default Tower;