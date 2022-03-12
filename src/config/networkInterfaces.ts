import os from "os";

const networkInterfaces = os.networkInterfaces();
const wifiArray = networkInterfaces["Wi-Fi"];
if (wifiArray === undefined) {
  throw new Error("Wi-Fi 인터페이스가 존재하지 않습니다");
}
export const address = wifiArray.find((val) => val.family === "IPv4")?.address;
