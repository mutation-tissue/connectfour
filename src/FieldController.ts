//盤面の状態を管理
export class FieldController {
    field: number[][];
    fieldSizeX: number;
    fieldSizeY: number;
  
    constructor(fieldSizeX: number, fieldSizeY: number) {
      this.fieldSizeX = fieldSizeX;
      this.fieldSizeY = fieldSizeY;
    }
  
    //盤面の状態管理
    createField() {
      this.field = Array.from({ length: this.fieldSizeX },() => 
        Array.from({ length: this.fieldSizeY }, () => 0)
      );
    }
  
    showField() {
      let fieldindex:string = '';
      for(let i=0; i<this.fieldSizeX; i++){
        console.log('|' + this.field[i].join('|') + '|');
      }
  
      for(let i=0; i<this.fieldSizeX; i++){
        fieldindex += '|'+i.toString()
      }
  
      console.log('-'.repeat(this.fieldSizeX*2));
      console.log(fieldindex +'|');
    }
  
    addCoinToFiled(addCoinPlace:number, pieceType:number) {
      let addCoinRow:number = -1;
      for(let rowindex = 0; rowindex < this.fieldSizeY; rowindex++){
        if(this.field[addCoinPlace][rowindex] === 0){
          addCoinRow += 1;
        } else {
          break;
        }

      }
  
      if(addCoinRow !== -1){
        this.field[addCoinPlace][addCoinRow]=pieceType;
        return [addCoinPlace, addCoinRow];
      }
      return [-1,-1];
    }
  }