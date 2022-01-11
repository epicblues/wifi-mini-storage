# Wifi-Mini-Storage

## 와이파이 내에서 간단한 파일 공유 웹 애플리케이션

<hr/>

| 기능   | 기술       |
| ------ | ---------- |
| Server | ExpressJs  |
| 언어   | TypeScript |

## 구현 목표

<hr/>
1. /download 디렉토리에 파일/폴더를 넣으면 브라우저로 탐색 가능
2. /download/폴더

3. **public** -> 실제로 파일을 제공하는 url

## 한글명 url <-> express endpoint 불일치 문제 -> 해결

<hr/>

```javascript
//모든 폴더 이름에 맞춰서 요청 처리 함수를 배치하지 않고
//download 경로로 오는 요청의 url만 받아서 처리
app.get("/download*", (req, res) => {

// req.url = /download/경로/디렉토리명(encoded)
// 특정 url endpoint가 encoding 문제로
// 요청 자체를 express에서 인식 못하던 문제 해결
const relativeDirectoryPath = decodeURI(req.url.slice(1));

const absoluteDirPath = path.resolve("./", relativeDirectoryPath);
const fileList = readdirSync(absoluteDirPath);
....
}
```
