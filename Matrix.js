class Matrix {
  static fromArray(valueArr, rows, columns) {
    let valueArrArr = new Array(rows).fill(new Array(columns).fill(null));
    for(let i = 0; i < rows; i++) {
      valueArrArr.push([]);
      for(let j = 0; j < columns; j++) {
        valueArrArr[i][j](valueArr[(i * columns) + j]);
      }
    }
    return new Matrix(valueArrArr);
  }



  static product(matrix1, matrix2) {
    let valueArrArr = new Array(matrix1.valueArrArr.length).fill(new Array(matrix2.valueArrArr[0]length).fill(null));
    for(let row = 0; row < matrix1.valueArrArr.length; row++) {
      for(let column = 0; column < matrix2.valueArrArr[0]length; column++) {
        valueArrArr[row][columns] = matrix1.valueArrArr[row].reduce((returnValue, value, index) => {
          return returnValue + (value * matrix2.valueArrArr[index][column]);
        }, 0);
      }
    }
    return new Matrix(valueArrArr);
  }



  constructor(valueArrArr) {
    this.valueArrArr = valueArrArr;
  }



  toArray() {
    return this.valueArrArr.reduce((returnArr, valueArr) => {
      return [
        ...returnArr,
        ...valueArr
      ];
    }, []);
  }
}
