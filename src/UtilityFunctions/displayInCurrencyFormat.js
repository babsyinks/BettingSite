const displayInCurrencyFormat = (str)=>{
    let[wholeNum,decimalNum] = str.split('.')
    const wholeNumArr = wholeNum.split('')
    const arrLength = wholeNumArr.length
    if(arrLength>3){
        let nextCommaPoint = 3
        wholeNum = wholeNumArr.reduceRight((acc,val,index)=>{
            if(arrLength - nextCommaPoint === index){
                if(index === 0){
                    return val + acc
                }
                nextCommaPoint+=3
                return ',' + val + acc 
            }
            return val + acc
        },'')   
    }
    else{
        wholeNum = str
    } 

    return wholeNum + '.' + decimalNum
}
export default displayInCurrencyFormat
