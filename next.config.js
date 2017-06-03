const path = require('path');

module.exports = {
    exportPathMap: function () {
        return {
            "/": {page: "/"}
        }
    },
    webpack: (config) => {
        // console.log(config.module.rules);
        return config;
    },
};
