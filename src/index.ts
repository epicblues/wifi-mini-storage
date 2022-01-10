import dotenv from "dotenv";
import express from "express";
import { readdirSync } from "fs";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/public", express.static("download"));

// 해당 디렉토리의 리스트를 읽고
// 리스트가 파일인지 / 디렉토리인지 구분하고
// 파일은 일반적인 링크 생성
// 디렉토리는 새로운 미들웨어 생성

const getDirectoryAndMakeEndPoint = (
  dirName: string,
  upperPath: string[] = [],
  app: ReturnType<typeof express>
) => {
  if (upperPath.length > 0) {
    dirName = [...upperPath, dirName].join("/");
    // console.log(dirName);
  }

  const fileList: string[] = readdirSync(path.resolve("./", dirName));

  // console.log(fileList);
  const htmlBuffer: string[] = [];

  fileList.forEach((fn) => {
    try {
      // console.log(fn);
      readdirSync(path.resolve(dirName, fn));
      // 여기서 에러가 나지 않으면 fn은 디렉토리 네임

      htmlBuffer.push(
        `<button><a href="/${dirName}/${encodeURIComponent(
          fn
        )}">${fn}</a></button>`
      );
      getDirectoryAndMakeEndPoint(fn, dirName.split("/"), app);
    } catch (e) {
      const extraURI =
        dirName.slice(9).length > 1
          ? encodeURIComponent(dirName.slice(9).concat("/"))
          : "";
      htmlBuffer.push(
        `<div><a href="/public/${extraURI}${encodeURIComponent(
          fn
        )}">${fn}</a></div>`
      );
    }
  });
  // console.log(`/${dirName}`, htmlBuffer.length);

  // 인코딩 분리

  const fullyEncodedDirName = dirName
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  if (dirName.includes("김민성")) {
    console.log(dirName);
    console.log(fullyEncodedDirName);
  }

  app.get(`/${fullyEncodedDirName}`, (_, res) => {
    res.send(htmlBuffer.join(""));
  });
};

getDirectoryAndMakeEndPoint("download", [], app);

app.listen(PORT, () => console.log("listening on port : " + PORT));
