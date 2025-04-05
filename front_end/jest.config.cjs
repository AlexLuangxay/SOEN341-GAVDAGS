module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'], // ✅ only this
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/fileMock.js'
  }
};
