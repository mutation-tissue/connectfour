import { question } from './index';

interface User {
    userName:string;
    age:number;
}

//ゲームで必要な情報を追加する。
export type GamePlayer = User & {
    isYourTurn: boolean;
    piece: number;
  };

export const directions = [
    { row: -1, col: 0 },  // 上
    { row: 1, col: 0 },   // 下
    { row: 0, col: -1 },  // 左
    { row: 0, col: 1 },   // 右
    { row: -1, col: -1 }, // 左上
    { row: -1, col: 1 },  // 右上
    { row: 1, col: -1 },  // 左下
    { row: 1, col: 1 }    // 右上
  ];
  
export  class GameState{
  
    isfinish: boolean;
    Players:GamePlayer[];
    CoinPlayer:GamePlayer;
  
    constructor(users:GamePlayer[]){
      this.isfinish = false;
      this.Players = users;
      this.CoinPlayer = users[0];
    }
  
    //先行がだれかを決める。
    decideOrderPlayer(){
      const shuffledPlayer = [...this.Players].sort(()=>Math.random() -0.5);
  
      this.Players = shuffledPlayer.map((Players,index) =>({
        ...Players,
        isYourTurn: index+1 === 1 ? true : false,
        piece: index+1
      }));
    }
  
    async inputAddCoinPlace(){
      this.CoinPlayer = this.Players.filter((Player) => Player.isYourTurn)[0];
      //後で複数見つかった時の処理を追加する
      return Number(await question(`${this.CoinPlayer.userName} turn. type place you want to add coin :`));
    }
  
    changeTurn(){
      const currentIndex = this.CoinPlayer.piece - 1;
      this.Players[currentIndex].isYourTurn = false;
      const nextIndex = (currentIndex + 1) % this.Players.length;
      this.Players[nextIndex].isYourTurn = true;
    }
  
    isFinishGame(field:number[][],x:number,y:number){
      const targetValue = field[x][y];
      const results: { direction: string; count: number }[] = [];
      const directionNames = ["上", "下", "左", "右", "左上", "右上", "左下", "右下"];
      
      directions.forEach((dir, index) => {
        let count = 0;
        let currentRow = x + dir.row;
        let currentCol = y + dir.col;
        
        // その方向に進み続ける
        while (
          currentRow >= 0 && 
          currentRow < field.length &&
          currentCol >= 0 && 
          currentCol < field[0].length &&
          field[currentRow][currentCol] === targetValue
        ) {
          count++;
          currentRow += dir.row;
          currentCol += dir.col;
        }
        
        results.push({
          direction: directionNames[index],
          count: count
        });
      });
      //console.log(results);
      
      // 対になる方向を合計（上+下、左+右、左上+右下、右上+左下）
      const verticalLength = results[0].count + results[1].count + 1; // 上下
      const horizontalLength = results[2].count + results[3].count + 1; // 左右
      const diagonal1Length = results[4].count + results[7].count + 1; // 左上-右下
      const diagonal2Length = results[5].count + results[6].count + 1; // 右上-左下
      
      if(verticalLength >= 4 || horizontalLength >= 4 || diagonal1Length >= 4 || diagonal2Length >= 4){
        return true;
      }
      return false;
    }
  }