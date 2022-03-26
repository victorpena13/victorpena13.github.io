equationList = [];

function captureEquation() {
    var equation = {
        problem: ''
    }
    equation.problem = $('#users-equation').val();
    equationList.push(equation);
    console.log(equation);
    calculate();
}
$('.equals').click(captureEquation);

function calculate() {
    for(let i = 0; i < equationList.length;  i++) {
        if (equationList[i].problem.includes('-')) {
            let splitEquation = equationList[i].problem.split('-');
            console.log(splitEquation);
            console.log(parseInt(splitEquation[0]) - parseInt(splitEquation[1]));
        } else if (equationList[i].problem.includes('+')) {
            let splitEquation = equationList[i].problem.split('+');
            console.log(splitEquation);
            console.log(parseInt(splitEquation[0]) + parseInt(splitEquation[1]));
        } else if (equationList[i].problem.includes('*')) {
            let splitEquation = equationList[i].problem.split('*');
            console.log(splitEquation);
            console.log(parseInt(splitEquation[0]) * parseInt(splitEquation[1]));
        } else if(equationList[i].problem.includes('/')) {
            let splitEquation = equationList[i].problem.split('/');
            console.log(splitEquation);
            console.log(parseInt(splitEquation[0]) / parseInt(splitEquation[1]));;
        }
    }
}