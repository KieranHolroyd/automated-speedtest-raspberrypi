const speedtest = require("speedtest-net");
const fs = require("fs");

// Get Mac Address
var ifaces = require("os").networkInterfaces();
let macaddress = Object.keys(ifaces).reduce(function (result, dev) {
  return ifaces[dev].reduce(function (result, details) {
    return result.concat(
      details.family === "IPv4" && !details.internal ? details.mac : ""
    );
  }, "");
});

// Print Initial Info
console.log("Starting speedtest...");
console.log(
  `Running on ${process.platform} ${process.arch} NodeJS ${
    process.version
  } | [Uptime ${process.uptime()}s] [${new Date().toLocaleString()}] | MacAddress: ${macaddress}`
);
(async () => {
  const fixBandwidth = (speed) => {
    // Convert to Mbps
    return ((speed / 1024 / 1024) * 8).toFixed(1);
  };
  const current = { download_speed: 0, upload_speed: 0, ping: 0 };
  const result = await speedtest({
    acceptGdpr: true,
    acceptLicense: true,
    progress: (update) => {
      // Update current speeds
      switch (update.type) {
        case "download":
          current.download_speed = update.download.bandwidth;
          break;
        case "upload":
          current.upload_speed = update.upload.bandwidth;
          break;
        case "ping":
          current.ping = update.ping.latency;
          break;
      }
      // Print Progress (Overwrite previous line) \r is very nice
      process.stdout.write(
        `Progress: ${(update.progress * 100).toFixed(1)}% | S/R ${fixBandwidth(
          current.upload_speed
        )}Mbps/${fixBandwidth(current.download_speed)}Mpbs | Ping ${
          current.ping
        }ms${update.progress === 1 ? " | Finishing up!" : ""}\r`
      );
    },
  });
  process.stdout.write(`\n`);
  // Read results.csv file and append new result
  let csv = fs.readFileSync(__dirname + "/results.csv", "utf8");
  csv += `${Date.now()},${macaddress},${fixBandwidth(
    result.download.bandwidth
  )},${fixBandwidth(result.upload.bandwidth)},${result.ping.latency},${
    result.result.url
  }\n`;
  fs.writeFileSync(__dirname + "/results.csv", csv);
})();
