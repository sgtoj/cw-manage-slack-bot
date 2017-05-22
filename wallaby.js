module.exports = wallaby => {

    return {
        files: [
            "src/**/*.ts",
            "!src/**/*.Test.ts"
        ],
        tests: [
            "src/**/*.Test.ts"
        ],
        env: {
            type: "node"
        },
        compilers:{
            "src/**/*.ts": wallaby.compilers.typeScript({
                "compilerOptions": {
                    "module": "commonjs",
                    "target": "esnext",
                    "sourceMap": true,
                }
            })
        },

        setup: function (w) {
            var mocha = w.testFramework;
            mocha.timeout(5000);
        }
    }

}

