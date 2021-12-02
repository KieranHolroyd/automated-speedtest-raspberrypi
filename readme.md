# Raspberry Pi Ready automated speedtester

_for the best performance connect the Pi directly to your router with an ethernet cable._

### Setup

To setup simply clone the repository onto your raspberry pi, make sure you have NodeJS (tested & working on NodeJS v16 & v17), install the dependencies with `npm install` and run the `npm start` command to check the output in console looks correct.

finally, edit your cron file with `crontab -e` and add the following line:
`0 * * * * /usr/bin/node /home/pi/automated-speedtest-raspberrypi`
This will run the script once an hour and the output will be saved to results.csv in the root of the repository.

you can either edit this project and send the results wherever you would like to see them or just download it once in a while or when you're noticing internet issues to see if it's you or your network.
