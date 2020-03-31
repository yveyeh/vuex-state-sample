module.exports = {
    "verbose": true,
    "transform": {
        "^.+\\.(ts|tsx)": "ts-jest",
        "^.+\\.html?$": "html-loader-jest",
        "^.+\\.css?$": "jest-css-modules"
    },
    "testRegex": "\\.test\\.tsx?$",
    "moduleNameMapper": {
        "^.+\\.css?$": "<rootDir>/tests/excludes/excludes.ts"
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ]
}