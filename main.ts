input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.plotBarGraph(
    Led_s_number,
    25
    )
    strip.showRainbow(1, 360)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        basic.clearScreen()
        led.plot(2, 1)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        basic.clearScreen()
        led.plot(1, 2)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        basic.clearScreen()
        led.plot(3, 2)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN) {
        basic.clearScreen()
        led.plot(2, 3)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        basic.clearScreen()
        led.plot(2, 0)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_DOWN) {
        basic.clearScreen()
        led.plot(0, 2)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_DOWN) {
        basic.clearScreen()
        led.plot(4, 2)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        basic.clearScreen()
        led.plot(2, 4)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN && control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        basic.clearScreen()
        led.plot(2, 2)
    } else {
    	
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.pause(2000)
    basic.clearScreen()
    basic.showString("bluetooth device disconnected")
    basic.pause(2000)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    led.plotBarGraph(
    input.lightLevel(),
    255
    )
})
input.onGesture(Gesture.Shake, function () {
    if (_of_battery < 1200) {
        led.plotBarGraph(
        _of_battery,
        1200
        )
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    }
})
bluetooth.onBluetoothConnected(function () {
    device_name = control.deviceName()
    basic.showString(device_name)
})
function sensing () {
    reading = pins.analogReadPin(AnalogPin.P1)
    for (let index = 0; index <= 4; index++) {
        readPln()
    }
    btnValue = reading + samples
    grapWal = btnValue - offset
    serial.writeLine("" + (grapWal))
    led.plotBarGraph(
    grapWal,
    255
    )
}
input.onGesture(Gesture.LogoDown, function () {
    mouse.movexy(0, -63)
})
function readPln () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(0.1)
    reading += pins.analogReadPin(AnalogPin.P0)
}
input.onGesture(Gesture.FreeFall, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    music.setVolume(255)
    music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", 500), music.PlaybackMode.UntilDone)
    basic.pause(1000)
    music.setVolume(127)
    music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", _of_battery), music.PlaybackMode.UntilDone)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    if (runner == "up") {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        basic.pause(2000)
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 180)
        servos.P0.setAngle(100)
        pins.servoWritePin(AnalogPin.P1, 0)
        servos.P1.setAngle(0)
    } else if (runner == "back") {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.pause(2000)
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 0)
        servos.P0.setAngle(0)
        pins.servoWritePin(AnalogPin.P1, 180)
        servos.P1.setAngle(180)
    } else if (runner == "left") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # . . . .
            . # . . .
            . . # . .
            `)
        basic.pause(2000)
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 180)
        servos.P0.setAngle(180)
        pins.servoWritePin(AnalogPin.P1, 180)
        servos.P1.setAngle(180)
    } else if (runner == "right") {
        basic.showLeds(`
            . . # . .
            . . . # .
            . . . . #
            . . . # .
            . . # . .
            `)
        basic.pause(2000)
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 0)
        servos.P0.setAngle(0)
        pins.servoWritePin(AnalogPin.P1, 0)
        servos.P1.setAngle(0)
    } else if (runner == "stop") {
        basic.showString("stop")
        basic.pause(2000)
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 90)
        servos.P0.setAngle(90)
        pins.servoWritePin(AnalogPin.P1, 90)
        servos.P1.setAngle(90)
    }
})
input.onButtonPressed(Button.B, function () {
    led.plotBarGraph(
    input.soundLevel(),
    255
    )
})
input.onButtonPressed(Button.AB, function () {
    Led_s_number += 1
    strip = neopixel.create(DigitalPin.P0, Led_s_number, NeoPixelMode.RGB)
    OLED.writeNumNewLine(Led_s_number)
    basic.showString("" + (Led_s_number))
    basic.clearScreen()
})
input.onGesture(Gesture.TiltLeft, function () {
    mouse.movexy(-63, 0)
})
input.onGesture(Gesture.LogoUp, function () {
    mouse.movexy(0, 63)
})
input.onGesture(Gesture.TiltRight, function () {
    mouse.movexy(63, 0)
})
let Entry = ""
let grapWal = 0
let btnValue = 0
let device_name = ""
let strip: neopixel.Strip = null
let runner = ""
let Led_s_number = 0
let offset = 0
let samples = 0
let reading = 0
let _of_battery = 0
for (let index = 0; index < 4; index++) {
    basic.showLeds(`
        . . # # #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . # # .
        . # . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . # . .
        . # . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . # . . .
        . . # # .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # # .
        . . . . #
        . . . . .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . # .
        . . . . #
        . . . # .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . #
        . . # # .
        `)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . # . . .
        . . # # .
        `)
    basic.clearScreen()
    basic.showString("mushroommun")
    basic.clearScreen()
}
nexusbit.selectBoard(boardType.nexusbit)
OLED.init(128, 64)
keyboard.startKeyboardService()
bluetooth.startButtonService()
bluetooth.startAccelerometerService()
bluetooth.startUartService()
bluetooth.startLEDService()
bluetooth.startTemperatureService()
bluetooth.startMagnetometerService()
let _set = 0
_of_battery = Math.round(pins.analogReadPin(AnalogPin.P0) * 3000 / 1023)
reading = 0
samples = 10
let runSensor = true
offset = 320
let Password = "Number entry"
Led_s_number = 0
Password = "Number entry"
runner = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
huskylens.forgetLearn()
basic.forever(function () {
    huskylens.request()
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        _set += 1
        basic.showString("" + (_set))
    } else if (input.logoIsPressed() && input.buttonIsPressed(Button.B)) {
    	
    } else if (input.isGesture(Gesture.LogoUp) && input.isGesture(Gesture.TiltLeft)) {
        mouse.movexy(-63, 63)
    } else if (input.isGesture(Gesture.LogoDown) && input.isGesture(Gesture.TiltLeft)) {
        mouse.movexy(63, -63)
    } else if (input.isGesture(Gesture.LogoUp) && input.isGesture(Gesture.TiltRight)) {
        mouse.movexy(63, 63)
    } else if (input.isGesture(Gesture.LogoDown) && input.isGesture(Gesture.TiltRight)) {
        mouse.movexy(-63, -63)
    } else if (input.logoIsPressed() && input.buttonIsPressed(Button.B)) {
        strip.show()
    } else if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showLeds(`
            # . # . #
            # . # # #
            # # # # #
            # # # # .
            . . # # #
            `)
    }
    if (nexusbit.joystickToDir(joystickDir.forward)) {
        pins.servoWritePin(AnalogPin.P0, 180)
        servos.P0.setAngle(100)
        pins.servoWritePin(AnalogPin.P1, 0)
        servos.P1.setAngle(0)
    } else if (nexusbit.joystickToDir(joystickDir.backward)) {
        pins.servoWritePin(AnalogPin.P0, 0)
        servos.P0.setAngle(0)
        pins.servoWritePin(AnalogPin.P1, 180)
        servos.P1.setAngle(180)
    } else if (nexusbit.joystickToDir(joystickDir.left)) {
        pins.servoWritePin(AnalogPin.P0, 180)
        servos.P0.setAngle(180)
        pins.servoWritePin(AnalogPin.P1, 180)
        servos.P1.setAngle(180)
    } else if (nexusbit.joystickToDir(joystickDir.right)) {
        pins.servoWritePin(AnalogPin.P0, 0)
        servos.P0.setAngle(0)
        pins.servoWritePin(AnalogPin.P1, 0)
        servos.P1.setAngle(0)
    } else if (nexusbit.joystickToDir(joystickDir.center)) {
        basic.showString("stop")
        pins.servoWritePin(AnalogPin.P0, 90)
        servos.P0.setAngle(90)
        pins.servoWritePin(AnalogPin.P1, 90)
        servos.P1.setAngle(90)
    } else if (input.buttonIsPressed(Button.A) && input.logoIsPressed()) {
        Entry = "Number entry"
    } else if (Password == Entry) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            # # . # #
            . . . . .
            . # # # .
            # . . # .
            `)
    }
})
