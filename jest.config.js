export const roots = ["<rootDir>/src"];
export const transform = {
  "^.+\\.tsx?$": "ts-jest"
};

export default {
  roots,
  transform,
  testEnvironment: 'jsdom',
};

