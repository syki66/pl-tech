exports.firstFigures = (parsed) => {
    let figures = new Object();

    figures.outsideTemp = parsed[0];
    figures.heatProd = parsed[1];
    figures.amount = parsed[2];
    figures.selfSupp = parsed[3];
    figures.linkedSupp = parsed[4];
    figures.linkedSeq = parsed[5];
    figures.heatSales = parsed[6];
    

    return JSON.parse(JSON.stringify(figures));
}