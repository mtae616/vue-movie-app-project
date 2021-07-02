module.exports = {
  // 파일 확장자를 지정하지 않은 경우, jest가 검색할 확장자 목록입니다.
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  // '~' 같은 경로 별칭을 매핑합니다.
  //<rootDir> 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  //일치하는 경로에서는 모듈을 가져오지 않습니다.
  //<rootDir> 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ],
  // jsdom 환경에 대한 URL을 설정합니다.
  testURL:'http://localhost',
  //정규식과 일치하는 파일의 변환 모듈을 지정합니다.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  }
  
}