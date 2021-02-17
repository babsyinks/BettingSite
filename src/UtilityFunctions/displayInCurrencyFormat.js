const displayInCurrencyFormat = (str)=>{
    const errorDiv = document.getElementById('error')
    const betButton = document.getElementById('betButton')  
    if(errorDiv){
        if(+str>1000000000){
            errorDiv.style= 'display:block'
            errorDiv.textContent = 'Maximum winnable amount is $1000,000,000'
            betButton.disabled = true
        }
        else{
            errorDiv.style ='display:none'
            errorDiv.textContent = ''
            betButton.disabled = false
        } 
    }

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
        return str
        
    } 

    return wholeNum + '.' + decimalNum
}
export default displayInCurrencyFormat


