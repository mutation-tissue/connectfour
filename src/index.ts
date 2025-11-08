import * as readline from 'readline';
import { GameState,GamePlayer } from './GameController';
import { FieldController } from './FieldController';
import { inputUserinfo } from './InputUserInfo';

//入力受付のためのコネクションを確立
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const question = (query: string): Promise<string> => {
  return new Promise(resolve => r1.question(query, resolve));
};


async function main() {
  const Player1:GamePlayer = await inputUserinfo();
  const Player2:GamePlayer = await inputUserinfo();
  const allGamePlayer:GamePlayer[] = [Player1,Player2];

  //盤面のサイズを決め、盤面を作成する。
  const ConnectFourFieldController = new FieldController(8, 8);
  ConnectFourFieldController.createField();
  ConnectFourFieldController.showField();

  //ゲームを管理するクラスを作成し、先攻後攻を決める。
  const ConnectFourGameController = new GameState(allGamePlayer);
  ConnectFourGameController.decideOrderPlayer();

  //ゲームを始める
  while(!ConnectFourGameController.isfinish){
    //console.log(ConnectFourGameController)
    const selectedAddCoinPlace:number = await ConnectFourGameController.inputAddCoinPlace();
    const [x, y] = ConnectFourFieldController.addCoinToFiled(selectedAddCoinPlace,ConnectFourGameController.CoinPlayer.piece);

    //新しく追加されたコインがどこに落ちたのか表示する。
    ConnectFourFieldController.showField();

    
    //勝敗判定をする
    const isFinish = ConnectFourGameController.isFinishGame(ConnectFourFieldController.field,x,y);
    if(isFinish){
      ConnectFourGameController.isfinish = true;
      console.log(`${ConnectFourGameController.CoinPlayer.userName} wins!`);
    } else {
      ConnectFourGameController.changeTurn();
    }
    //break;
  }

  r1.close();
}


main();