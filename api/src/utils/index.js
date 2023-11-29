const infoApi = (apiResponse) => {
    const { results } = apiResponse;
    const resultArray = [];
    results.forEach((element) => {
        resultArray.push({
            name: element.name,
            url: element.url,
        })
    });
    return resultArray;
}      

module.exports = {
    infoApi
}