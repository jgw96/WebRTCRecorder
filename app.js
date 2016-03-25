"use strict";

let recordRTC;
let recordedBlob;
const btnStopRecording = document.querySelector("#stop");
const video = document.querySelector("#video");
const saveButton = document.querySelector("#save");
const recordButton = document.querySelector("#record");
const noSaveButton = document.querySelector("#noSave");
const mediaConstraints = { video: true, audio: true };

const successCallback = (stream) => {

    video.src = window.URL.createObjectURL(stream);

    const options = {
        mimeType: 'video/webm', // or video/mp4 or audio/ogg 
        bitsPerSecond: 128000
    };
    recordRTC = RecordRTC(stream, options);
    recordRTC.startRecording();
}

const errorCallback = (error) => {
    console.log(error);
}

recordButton.onclick = () => {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
    recordButton.style.display = "none";
    btnStopRecording.style.display = "block";
}

noSaveButton.onclick = () => {
    noSaveButton.style.display = "none";
    recordButton.style.display = "block";
}


btnStopRecording.onclick = () => {
    recordRTC.stopRecording((audioVideoWebMURL) => {
        video.src = audioVideoWebMURL;

        recordedBlob = recordRTC.getBlob();

        btnStopRecording.style.display = "none";
        saveButton.style.display = "block";
        noSaveButton.style.display = "block";
    });
};

saveButton.onclick = () => {
    recordRTC.save();

    saveButton.style.display = "none";
    recordButton.style.display = "block";
    noSaveButton.style.display = "none";
}