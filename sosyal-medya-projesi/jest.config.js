module.exports = {


    moduleNameMapper: {
  
  
      "^axios$": "<rootDir>/src/__mocks__/axios.js",
  
    },
  
    transform: {
  
  
      "^.+\\.[tj]sx?$": "babel-jest",
  
    },
  
    transformIgnorePatterns: [
  
      
      "node_modules/(?!(axios)/)",
  
    ],
  
    testEnvironment: "jsdom",
  
  };