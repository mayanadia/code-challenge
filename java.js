let readline = require('readline');

function calculateTax(income){
    let taxSlabs = [
        {limit:24000,rate:0.1},
        {limit:32333,rate:0.25},
        {limit:500000,rate:0.3},
        {limit:800000,rate:0.35},
    ];
    let tax =0;
    let remainIncome = income;
    for (const slab of taxSlabs){
        if (remainIncome <=0) break;
        const taxableAmount =Math.min(remainIncome, slab.limited)
        tax+= taxableAmount*slab.rate;

        remainIncome -=taxableAmount
    }
    return tax;
}
function calculateNHIFDeductions(grossPay){
    let nhifRates = [
        {limit:5999,deduction:150},
        {limit:11999,deduction:460},
        {limit:29999,deduction:850},
        {limit:100000,deduction:1700},

    ]
    for (const rate of nhifRates){
        if (grossPay<= rate.limit){
            return rate .deduction;
        }
            }
        
    return nhifRates[nhifRates.length -1].deduction;
}  
function calculateNSSFContributions(pensionalPay){

const tierIRate = 0.06;
const tierIILowestLimit = 7001;


if (pensionalPay <= tierIILowestLimit){
    return pensionalPay* tierIRate;
}else {
    return tierIILowestLimit * tierIRate;
}
}

function calculateNetSalary(basicSalary, benefits){
    let grossSalary =basicSalary + benefits;
    let tax = calculateTax(grossSalary)
    let NHIFDeductions = calculateNHIFDeductions(grossSalary)
    let NSSFDeductions = calculateNSSFContributions(basicSalary);
    let netSalary = grossSalary - tax -NHIFDeductions - NSSFDeductions;


    return{
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
       netSalary,
    };
}
    function getUserInput(question){
        const r1 = readline.createInterface({
            input:process.stdin,
            output:process.stdout
        });

        return new Promise((resolve)=>{
            r1.question(question, (answer) =>{
                r1.close();
                resolve(parseFloat(answer));
            });
        });
    }
    async function run(){
        const basicSalary = await getUserInput("Your basic salary =");
        const benefits = await getUserInput("Your benefits =");
        const salaryDetails = calculateNetSalary(basicSalary, benefits);
    



        console.log("Gross = ", salaryDetails.grossSalary);
        console.log("Tax = ", salaryDetails.tax);
        console.log("NHIF Ded =", salaryDetails.NHIFDeduction);
        console.log("NSSF Ded =",salaryDetails.NSSFDeductons);
        console.log("Net =",salaryDetails.netSalary);
    }
    run();




