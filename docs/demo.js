navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  preview.srcObject = stream;
  navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.filter(device => device.kind === 'videoinput').forEach(device => {
      let btn = document.createElement('button');
      btn.textContent = device.label;
      btn.dataset.deviceId = device.deviceId;
      btn.onclick = function () {
        changeDdevice(this.dataset.deviceId);
      }
      btnDeviceIdContainer.appendChild(btn);
    });
    res.textContent = JSON.stringify(devices, null, 2);
  });
});
function changeFacingMode(facingMode) {
  if (preview.srcObject) {
    preview.srcObject.getTracks().forEach(track => track.stop());
    preview.srcObject = null;
  }
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: facingMode
    }
  }).then(stream => preview.srcObject = stream);
}
function changeDdevice(deviceId) {
  if (preview.srcObject) {
    preview.srcObject.getTracks().forEach(track => track.stop());
    preview.srcObject = null;
  }
  navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId
    }
  }).then(stream => preview.srcObject = stream);
}
btnUser.onclick = _ => changeFacingMode('user');
btnEnvironment.onclick = _ => changeFacingMode('environment');
btnLeft.onclick = _ => changeFacingMode('left');
btnRight.onclick = _ => changeFacingMode('right');
btnFront.onclick = _ => changeFacingMode('front');
btnBack.onclick = _ => changeFacingMode('back');
