import { question } from './index';

//初期設定
export async function inputUserinfo(){
    return {
      userName : String(await question("hello? what your name?")),
      age : Number(await question("what your age?")),
      isYourTurn : false,
      piece:0,
    }
  }