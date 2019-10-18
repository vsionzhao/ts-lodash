module.exports = {
    "presets": [
        [
            "es2015",
            {
                "modules": false
            }
        ],
        "stage-0",
    ],
    "plugins": [
        ["import", {
            "libraryName": "my-react",
            camel2UnderlineComponentName: false,
            camel2DashComponentName: false,
            customName: function (name) {
                if (!map[name]) {
                    console.log(name);
                }
                return `my-react/packages${map[name]}`;
            }
        }]
    ]
}