# Raspberry Pi Ready automated speedtester

_for the best performance connect the Pi directly to your router with an ethernet cable._

## Speedtest

To setup simply clone the repository onto your raspberry pi, make sure you have NodeJS (tested & working on NodeJS v16 & v17), install the dependencies with `npm install` and run the `npm start` command to check the output in console looks correct.

Finally, edit your cron file with `crontab -e` and add the following line:
`0 * * * * /usr/bin/node /home/pi/automated-speedtest-raspberrypi`
This will run the script once an hour and the output will be saved to results.csv in the root of the repository.

## Results Webserver

Quick update added a webserver to host the results. You can access the results at http://{server_ip}:4182/results.

The file [speedtest_result_server.service](./speedtest_result_server.service) is a systemd service file that will run the webserver on boot. Simply copy it into your `/etc/systemd/system/` folder and enable it with `systemctl enable speedtest_result_server.service` and `systemctl start speedtest_result_server.service`, you also may have to run `systemctl daemon-reload` to make the changes take effect before enabling the service.

Once the webserver is running you can access the results at http://{server_ip}:4182/results.

## Results.csv

The results.csv file contains the results of the speedtest. The first line contains the header, the following lines contain the results. It's formatted as in the example [results.csv](./results.csv) file included in the repository or in this table.

| timestamp     | macaddress        | download_speed | upload_speed | ping   | results_url                                                             |
| ------------- | ----------------- | -------------- | ------------ | ------ | ----------------------------------------------------------------------- |
| 1638406860199 | 00:00:00:00:00:00 | 42.3           | 37.0         | 14.092 | https://www.speedtest.net/result/c/095076ab-c1f0-47cf-ae49-b5219638ec9e |
| 1638406935008 | 00:00:00:00:00:00 | 41.9           | 40.7         | 14.6   | https://www.speedtest.net/result/c/971c9391-5ff8-4862-8e43-2a5c4dd2920a |

| Attribute      | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| timestamp      | The timestamp of the speedtest completion in milliseconds since epoch. |
| macaddress     | The mac address of the Raspberry Pi.                                   |
| download_speed | The download speed in megabits per second.\*                           |
| upload_speed   | The upload speed in megabits per second.\*                             |
| ping           | The ping in milliseconds.                                              |
| results_url    | The url to the results page on speedtest.net                           |

\* = as determined by speedtest.net's testing reigement.
