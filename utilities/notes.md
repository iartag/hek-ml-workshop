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

[Camera setup](https://www.raspberrypi.org/documentation/configuration/camera.md)  
[Camera doc + troubleshooting](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md)

## Misc

[logfiles](https://support.rackspace.com/how-to/linux-log-files/)  
[services](https://www.digitalocean.com/community/tutorials/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux)  
[headless setup](https://howtoraspberrypi.com/how-to-raspberry-pi-headless-setup/)  
[wifi wpa setup](https://www.raspberrypi-spy.co.uk/2017/04/manually-setting-up-pi-wifi-using-wpa_supplicant-conf/)  
[Mount sd card (OSX)](https://blog.gbaman.info/?p=328)  

OS version:
```terminal
uname -a
```
