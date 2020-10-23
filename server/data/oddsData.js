const ggParamsObj = {
    zero:{hg:3,hga:[3,4,5],lg:1,lga:[1,2,3]},
    one:{hg:3,hga:[1,2,3],lg:1,lga:[3,4,5]},
    two:{hg:3,hga:[0,1],lg:1,lga:[5,6,7]},
    three:{hg:2,hga:[7,8,9],lg:1,lga:[7,8,9]},
    four:{hg:2,hga:[5,6,7],lg:2,lga:[0,1,2]},
    five:{hg:2,hga:[3,4,5],lg:2,lga:[2,3,4]},
    six:{hg:2,hga:[0,1,2],lg:2,lga:[4,5,6]},
    seven:{hg:1,hga:[7,8,9],lg:2,lga:[6,7,8]},
    eight:{hg:1,hga:[5,6,7],lg:2,lga:[9]},
    nine:{hg:1,hga:[3,4,5],lg:3,lga:[0,1,2]}
}

const ou1p5ParamsObj = {
    zero:{hg:2,hga:[7,8],lg:1,lga:[6,7]},
    one:{hg:2,hga:[5,6],lg:1,lga:[8,9]},
    two:{hg:2,hga:[3,4],lg:2,lga:[0,1]},
    three:{hg:2,hga:[1,2],lg:2,lga:[2,3]},
    four:{hg:1,hga:[8,9],lg:2,lga:[4,5]},
    five:{hg:1,hga:[6,7],lg:2,lga:[6,7]},
    six:{hg:1,hga:[4,5],lg:2,lga:[8,9]},
    seven:{hg:1,hga:[3],lg:3,lga:[0,1]},
    eight:{hg:1,hga:[2],lg:3,lga:[2,3]},
    nine:{hg:1,hga:[1],lg:3,lga:[4,5]}
}

const ou2p5ParamsObj = {
    zero:{hg:2,hga:[9],lg:1,lga:[4,5]},
    one:{hg:2,hga:[7,8],lg:1,lga:[6,7]},
    two:{hg:2,hga:[5,6],lg:1,lga:[8,9]},
    three:{hg:2,hga:[3,4],lg:2,lga:[0,1]},
    four:{hg:2,hga:[0,1],lg:2,lga:[2,3]},
    five:{hg:1,hga:[8,9],lg:2,lga:[4,5]},
    six:{hg:1,hga:[6,7],lg:2,lga:[6,7]},
    seven:{hg:1,hga:[4,5],lg:2,lga:[8,9]},
    eight:{hg:1,hga:[3],lg:3,lga:[0,1]},
    nine:{hg:1,hga:[2],lg:3,lga:[2,3]}
}

const ou3p5ParamsObj = {
    zero:{hg:3,hga:[0,1],lg:1,lga:[2,3]},
    one:{hg:2,hga:[9],lg:1,lga:[4,5]},
    two:{hg:2,hga:[7,8],lg:1,lga:[6,7]},
    three:{hg:2,hga:[5,6],lg:1,lga:[8,9]},
    four:{hg:2,hga:[3,4],lg:2,lga:[0,1]},
    five:{hg:2,hga:[0,1,2],lg:2,lga:[2,3]},
    six:{hg:1,hga:[8,9],lg:2,lga:[4,5]},
    seven:{hg:1,hga:[6,7],lg:2,lga:[6,7]},
    eight:{hg:1,hga:[4],lg:2,lga:[8,9]},
    nine:{hg:1,hga:[3],lg:3,lga:[0,1]}
}

const ou4p5ParamsObj = {
    zero:{hg:3,hga:[2,3],lg:1,lga:[0,1]},
    one:{hg:3,hga:[0,1],lg:1,lga:[2,3]},
    two:{hg:2,hga:[9],lg:1,lga:[4,5]},
    three:{hg:2,hga:[7,8],lg:1,lga:[6,7]},
    four:{hg:2,hga:[6,7],lg:1,lga:[8,9]},
    five:{hg:2,hga:[4,5],lg:2,lga:[0,1]},
    six:{hg:2,hga:[2,3],lg:2,lga:[2,3]},
    seven:{hg:2,hga:[0,1],lg:2,lga:[4,5]},
    eight:{hg:1,hga:[8,9],lg:2,lga:[6,7]},
    nine:{hg:1,hga:[6,7],lg:2,lga:[8,9]}
}

const ou0p5HomeParamsObj = {
    zero:{hg:2,hga:[2,3],lg:1,lga:[8,9]},
    one:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    two:{hg:1,hga:[9],lg:2,lga:[2,3]},
    three:{hg:1,hga:[7,8],lg:2,lga:[4]},
    four:{hg:1,hga:[6],lg:2,lga:[5]},
    five:{hg:1,hga:[5],lg:2,lga:[6]},
    six:{hg:1,hga:[4],lg:2,lga:[7]},
    seven:{hg:1,hga:[3],lg:2,lga:[8,9]},
    eight:{hg:1,hga:[2],lg:3,lga:[0,1]},
    nine:{hg:1,hga:[1],lg:3,lga:[2,3]}
}

const ou1p5HomeParamsObj = {
    zero:{hg:2,hga:[4,5],lg:1,lga:[6,7]},
    one:{hg:2,hga:[2,3],lg:1,lga:[8,9]},
    two:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    three:{hg:1,hga:[9],lg:2,lga:[2,3]},
    four:{hg:1,hga:[7,8],lg:2,lga:[4]},
    five:{hg:1,hga:[6],lg:2,lga:[5]},
    six:{hg:1,hga:[5],lg:2,lga:[6]},
    seven:{hg:1,hga:[4],lg:2,lga:[7]},
    eight:{hg:1,hga:[3],lg:2,lga:[8,9]},
    nine:{hg:1,hga:[2],lg:3,lga:[0,1]}
}


const ou0p5AwayParamsObj = {
    zero:{hg:2,hga:[4,5],lg:1,lga:[7]},
    one:{hg:2,hga:[2,3],lg:1,lga:[8,9]},
    two:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    three:{hg:1,hga:[9],lg:2,lga:[2,3]},
    four:{hg:1,hga:[7,8],lg:2,lga:[4]},
    five:{hg:1,hga:[6],lg:2,lga:[5]},
    six:{hg:1,hga:[5],lg:2,lga:[6]},
    seven:{hg:1,hga:[4],lg:2,lga:[7]},
    eight:{hg:1,hga:[3],lg:2,lga:[8]},
    nine:{hg:1,hga:[2],lg:2,lga:[9]}
}

const ou1p5AwayParamsObj = {
    zero:{hg:2,hga:[6,7],lg:1,lga:[4,5]},
    one:{hg:2,hga:[4,5],lg:1,lga:[6,7]},
    two:{hg:2,hga:[2,3],lg:1,lga:[8,9]},
    three:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    four:{hg:1,hga:[9],lg:2,lga:[2,3]},
    five:{hg:1,hga:[7,8],lg:2,lga:[4]},
    six:{hg:1,hga:[6],lg:2,lga:[5]},
    seven:{hg:1,hga:[5],lg:2,lga:[6]},
    eight:{hg:1,hga:[4],lg:2,lga:[7]},
    nine:{hg:1,hga:[3],lg:2,lga:[8]}
}

const conerou8p5ParamsObj = {
    zero:{hg:2,hga:[5],lg:1,lga:[4]},
    one:{hg:2,hga:[4],lg:1,lga:[5,6]},
    two:{hg:2,hga:[3],lg:1,lga:[7,8]},
    three:{hg:2,hga:[2],lg:1,lga:[9]},
    four:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    five:{hg:1,hga:[9],lg:2,lga:[2,3]},
    six:{hg:1,hga:[7,8],lg:2,lga:[4]},
    seven:{hg:1,hga:[5,6],lg:2,lga:[5]},
    eight:{hg:1,hga:[3,4],lg:2,lga:[6]},
    nine:{hg:1,hga:[1,2],lg:2,lga:[7]}
}

const conerou11p5ParamsObj = {
    zero:{hg:2,hga:[8,9],lg:1,lga:[2]},
    one:{hg:2,hga:[6,7],lg:1,lga:[3,4]},
    two:{hg:2,hga:[4,5],lg:1,lga:[5,6]},
    three:{hg:2,hga:[3],lg:1,lga:[7,8]},
    four:{hg:2,hga:[2],lg:1,lga:[9]},
    five:{hg:2,hga:[0,1],lg:2,lga:[0,1]},
    six:{hg:1,hga:[9],lg:2,lga:[2,3]},
    seven:{hg:1,hga:[7,8],lg:2,lga:[4]},
    eight:{hg:1,hga:[6,7],lg:2,lga:[5]},
    nine:{hg:1,hga:[4,5],lg:2,lga:[6]}
}   

module.exports = {
                    ggParamsObj,
                    ou1p5ParamsObj,
                    ou2p5ParamsObj,
                    ou3p5ParamsObj,
                    ou4p5ParamsObj,
                    ou0p5HomeParamsObj,
                    ou1p5HomeParamsObj,
                    ou0p5AwayParamsObj,
                    ou1p5AwayParamsObj,
                    conerou8p5ParamsObj,
                    conerou11p5ParamsObj
                }