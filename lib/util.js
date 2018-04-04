
function makeRespond(middlewares, fn) {
    if (!middlewares) {
        throw new Error('middlewares can not be null');
    }

    if (!fn) {
        return middlewares;
    }

    if (Array.isArray(middlewares)) {
        middlewares.push(fn);
        return middlewares;
    }

    if (typeof middlewares === 'function') {
        return [middlewares, fn];
    }

    return fn;
}

/**
 * 
 * @param  array  the array data
 * @param  pageIndex   pageIndex of pager
 * @param  pageSize  pageSize of pager
 */

function arrayPage(array, pageIndex, pageSize) {

    if (!array) {
        return {
            totalPage: 0,
            totalCount: 0,
            items: [],
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    }
    
    let page = pageIndex || 1;
    let size = pageSize || 20;

    let start = (page - 1) * size;
    let stop = start + size;
    let data = array.slice(start, stop);
    let pageCount = Math.ceil(array.length / size);

    return {
        totalPage: pageCount,
        totalCount: array.length,
        items: data,
        pageIndex: pageIndex,
        pageSize: pageSize
    }

}

module.exports = {
    makeRespond,
    arrayPage
}