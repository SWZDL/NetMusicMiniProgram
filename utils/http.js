class Http {
    static request(url, data, callback, method = 'GET') {
        wx.request({
            url: `https://www.raspberry.cool${url}`,
            data,
            method,
            // header: {},
            success(res) {
                callback(res.data);
            }
        })
    }
}

export {
    Http
}