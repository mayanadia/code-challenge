function viewspeed (speed){
    //lets define some varables
    let limitedSpeed =70;
    let demerit = 5;
    let pointGiven =1;
    let warning = speed - limitedSpeed
    let points =(warning/demerit) * pointGiven
    let excess = 60;
    let danger =(limitedSpeed + excess)

    if (speed <= limitedSpeed){
        console.log("ok")
    } else if (speed >= requiredspeed){
        console.log("Lisense suspended")
    } else if (speeed > limitedSpeed)
    console.log(`Points` +points)

    



}
