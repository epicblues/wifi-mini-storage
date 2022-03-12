import dotenv from "dotenv";
import express from "express";
import { readdirSync } from "fs";
import path from "path";
import { settingTemplateBody } from "./template";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (_, res) => {
  res.redirect("/download");
});

app.use("/public", express.static("download"));

app.get("/download*", (req, res) => {
  const relativeDirectoryPath = decodeURI(req.url.slice(1));
  const absoluteDirPath = path.resolve("./", relativeDirectoryPath);
  const fileList = readdirSync(absoluteDirPath);

  const htmlBuffer: string[] = [];

  fileList.forEach((fn) => {
    try {
      // console.log(fn);
      readdirSync(path.resolve(absoluteDirPath, fn));
      // 여기서 에러가 나지 않으면 fn은 디렉토리 네임

      htmlBuffer.unshift(
        `<div class="directory"><a href="/${relativeDirectoryPath}/${encodeURIComponent(
          fn
        )}">${fn}</a></div>`
      );
    } catch (e) {
      htmlBuffer.push(
        `<div class="file"><a href="/public/${relativeDirectoryPath.slice(
          9
        )}/${encodeURIComponent(fn)}">${fn}</a></div>`
      );
    }
  });

  res.send(settingTemplateBody(htmlBuffer.join("")));
});
import { address } from "./config/networkInterfaces";

app.listen(PORT, () =>
  console.log(`listening on this address : http://${address}:${PORT}`)
);
