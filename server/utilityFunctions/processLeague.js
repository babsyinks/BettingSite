const processLeague = (countryObj,matchObject,league,fn)=>{
    const lgs = countryObj.leagues
               const topTier = league === 'EPL'||league === 'La Liga'||league === '1.Bundesliga'||league ==='Serie A'
               const secondTier = league === 'Championship'||league === 'La Liga2' ||league === '2.Bundesliga'||league === 'Serie B'
               const thirdTier = league === 'League 1'||league === 'Segunda B'||league === '3.Liga'||league === 'Serie C'
               const fourthTier = 'League 2'
               let team = ''
               if(topTier){
                team = fn(lgs[0],matchObject)
               }
               else if(secondTier){
                team = fn(lgs[1],matchObject)
               }
               else if(thirdTier){
               team = fn(lgs[2],matchObject)
               }
               else if(fourthTier){
               team = fn(lgs[3],matchObject)
               }
               return team

}

module.exports = processLeague