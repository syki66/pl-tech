exports.firstFigures = (parsed) => {
    let figures = [];

    let first = new Object();

    first.outsideTemp = parsed[0];
    first.heatProd = parsed[1];
    first.amount = parsed[2];
    first.selfSupp = parsed[3];
    first.linkedSupp = parsed[4];
    first.linkedSeq = parsed[5];
    first.heatSales = parsed[6];

    figures.push(first);
    

    return JSON.parse(JSON.stringify(figures));
}