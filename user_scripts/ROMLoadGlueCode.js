"use strict";
/*
 Copyright (C) 2012-2016 Grant Galitz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function attachBIOS(BIOS) {
    try {
        IodineGUI.Iodine.attachBIOS(new Uint8Array(BIOS));
    }
    catch (error) {
        IodineGUI.Iodine.attachBIOS(BIOS);
    }
}
function attachROM(ROM) {
    try {
        IodineGUI.Iodine.attachROM(new Uint8Array(ROM));
    }
    catch (error) {
        IodineGUI.Iodine.attachROM(ROM);
    }
}
function fileLoadShimCode(base64, ROMHandler) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    ROMHandler(bytes.buffer);
}
function fileLoadBIOS() {
    fileLoadShimCode(biosB64, attachBIOS);
}
function fileLoadROM() {
    fileLoadShimCode(romB64, attachROM);
}
function downloadFile(fileName, registrationHandler) {
    var ajax = new XMLHttpRequest();
    ajax.onload = registrationHandler;
    ajax.open("GET", "./" + fileName, true);
    ajax.responseType = "arraybuffer";
    ajax.overrideMimeType("text/plain; charset=x-user-defined");
    ajax.send(null);
}
function processDownload(parentObj, attachHandler) {
    try {
        attachHandler(new Uint8Array(parentObj.response));
    }
    catch (error) {
        var data = parentObj.responseText;
        var length = data.length;
        var dataArray = [];
        for (var index = 0; index < length; index++) {
            dataArray[index] = data.charCodeAt(index) & 0xFF;
        }
        attachHandler(dataArray);
    }
}
