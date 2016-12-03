navigator.mediaDevices.enumerateDevices().then(devices => {
    var videoDivices = devices.filter(device => device.kind === 'videoinput');
    Promise.all(videoDivices.map(device => {
        return navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: device.deviceId
            }
        })
    })).then(streams => {
        var previews = document.querySelectorAll('.preview');
        streams.forEach((stream, i) => previews[i].srcObject = stream);
    });
});
