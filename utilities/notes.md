# PI

## Camera
Test Camera:
```terminal
raspistill -v -o test.jpg
``` 
Detect camera:
```terminal
vcgencmd get_camera
```
Create a v4l2 device for the camera (make cam availables at `/dev/video0` )
```terminal
sudo modprobe bcm2835-v4l2
```
Add `bcm2835-v4l2` to `/etc/modules` to load module at boot time.
* [Camera setup](https://www.raspberrypi.org/documentation/configuration/camera.md)  
* [Camera doc + troubleshooting](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md)

## Audio
TBA

## Misc
* [logfiles](https://support.rackspace.com/how-to/linux-log-files/)  
* [services](https://www.digitalocean.com/community/tutorials/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux)  
* [headless setup](https://howtoraspberrypi.com/how-to-raspberry-pi-headless-setup/)  
* [wifi wpa setup](https://www.raspberrypi-spy.co.uk/2017/04/manually-setting-up-pi-wifi-using-wpa_supplicant-conf/)  
* [Mount sd card (OSX)](https://blog.gbaman.info/?p=328)

OS version:
```terminal
uname -a
```

# References
## Annotating
* [vgg](http://www.robots.ox.ac.uk/~vgg/software/via/)
* [mask_rcnn tutorials](https://engineering.matterport.com/splash-of-color-instance-segmentation-with-mask-r-cnn-and-tensorflow-7c761e238b46)

## Scrapping
* [Scrappers](https://github.com/montoyamoraga/scrapers) - Not much success with that one
* [Chrome extension](https://www.webscraper.io/) - Does not seem too work so much anymore
* [RipMe](https://github.com/4pr0n/ripme) - Works well but no success with ig :broken_heart:
* [Thread on ig image dl](https://github.com/ytdl-org/youtube-dl/issues/9337#issuecomment-440888272)
* [Instaloader](https://github.com/instaloader/instaloader) - Instagram image download, great success with ig :heart: