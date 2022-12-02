import React from 'react';
import '../css/minion.css';
import { minionType, TowerType } from '../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';

function Minion({boxSize, minion, setCurrentMinion, setCurrentTile, setCurrentTower, currentPlayer}: {
  boxSize: number,
  minion: minionType,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>,
  currentPlayer: 'p1' | 'p2'
}) {

  function handleClick() {
    if (minion.alignment === currentPlayer) {
      setCurrentTile(null);
      setCurrentTower(null);
      setCurrentMinion(minion.id);
    }
  }

  function handleContextMenu() {
    setCurrentTile({
      xPos: minion.xPos,
      yPos: minion.yPos
    })
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower !== false) && 'minionInTower'}`} style={{fill: `red`, height: `${boxSize}px`, width: `${boxSize}px`, top: `${boxSize*minion.yPos}px`, left: `${boxSize*minion.xPos}px`}}>
    {
      minion.type === 'Squirrel' ? <Squirrel currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Badger' ? <Badger currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Hare' ? <Hare currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Deer' ? <Deer currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Koala' ? <Koala currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Bear' && <Bear currentPlayer={`${minion.alignment}-color`} />
    }
  </div>
  )
}

export default Minion;
