def on_gesture_logo_down():
    basic.show_string("audio playing")
    basic.show_string("" + str((record.audio_status(record.AudioStatus.PLAYING))))
input.on_gesture(Gesture.LOGO_DOWN, on_gesture_logo_down)

def on_mes_dpad_controller_id_microbit_evt():
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_1_DOWN:
        basic.clear_screen()
        led.plot(2, 1)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_2_DOWN:
        basic.clear_screen()
        led.plot(1, 2)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_3_DOWN:
        basic.clear_screen()
        led.plot(3, 2)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_4_DOWN:
        basic.clear_screen()
        led.plot(2, 3)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_A_DOWN:
        basic.clear_screen()
        led.plot(2, 0)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_B_DOWN:
        basic.clear_screen()
        led.plot(0, 2)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_C_DOWN:
        basic.clear_screen()
        led.plot(4, 2)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_D_DOWN:
        basic.clear_screen()
        led.plot(2, 4)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_4_DOWN and control.event_value() == EventBusValue.MES_DPAD_BUTTON_D_DOWN:
        basic.clear_screen()
        led.plot(2, 2)
    else:
        pass
control.on_event(EventBusSource.MES_DPAD_CONTROLLER_ID,
    EventBusValue.MICROBIT_EVT_ANY,
    on_mes_dpad_controller_id_microbit_evt)

def on_button_pressed_a():
    led.plot_bar_graph(input.light_level(), 255)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_bluetooth_connected():
    global device_name
    device_name = control.device_name()
    basic.show_string(device_name)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_gesture_logo_up():
    basic.show_string("" + str((record.audio_status(record.AudioStatus.RECORDING))))
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_shake():
    if _of_battery < 1200:
        led.plot_bar_graph(_of_battery, 1200)
    else:
        basic.show_leds("""
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            """)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_gesture_free_fall():
    basic.show_leds("""
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        """)
    music.set_volume(255)
    music.play(music.string_playable("C5 B C5 B C5 B C5 B ", 500),
        music.PlaybackMode.UNTIL_DONE)
    basic.pause(1000)
    music.set_volume(127)
    music.play(music.string_playable("C5 B C5 B C5 B C5 B ", 500),
        music.PlaybackMode.UNTIL_DONE)
input.on_gesture(Gesture.FREE_FALL, on_gesture_free_fall)

def on_logo_pressed():
    global _set
    _set += 1
    led.plot_bar_graph(_set, 25)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_button_pressed_b():
    led.plot_bar_graph(input.sound_level(), 255)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_uart_data_received():
    global set_run
    set_run = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if set_run == "up":
        pins.servo_write_pin(AnalogPin.P0, 180)
        pins.servo_write_pin(AnalogPin.P1, 0)
    elif set_run == "down":
        pins.servo_write_pin(AnalogPin.P0, 0)
        pins.servo_write_pin(AnalogPin.P1, 180)
    elif set_run == "right":
        pins.servo_write_pin(AnalogPin.P0, 180)
        pins.servo_write_pin(AnalogPin.P1, 180)
    elif set_run == "left":
        pins.servo_write_pin(AnalogPin.P0, 0)
        pins.servo_write_pin(AnalogPin.P1, 0)
    elif set_run == "stop":
        pins.servo_write_pin(AnalogPin.P0, 90)
        pins.servo_write_pin(AnalogPin.P1, 90)
    elif set_run.char_at(0) == "x":
        pins.servo_write_pin(AnalogPin.P2, parse_float(set_run.substr(1, 3)))
    elif set_run.char_at(0) == "c":
        pins.servo_write_pin(AnalogPin.P2, parse_float(set_run.substr(1, 3)))
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

set_run = ""
device_name = ""
_of_battery = 0
_set = 0
keyboard.start_keyboard_service()
bluetooth.start_button_service()
bluetooth.start_accelerometer_service()
bluetooth.start_uart_service()
bluetooth.start_led_service()
bluetooth.start_temperature_service()
bluetooth.start_magnetometer_service()
_set = 0
_of_battery = Math.round(pins.analog_read_pin(AnalogPin.P0) * 3000 / 1023)

def on_forever():
    global _set
    if pins.digital_read_pin(DigitalPin.P0) == 1:
        _set += 1
        basic.show_string("" + str((_set)))
    elif input.logo_is_pressed() and input.button_is_pressed(Button.B):
        basic.show_string("sended")
        keyboard.send_string(keyboard.keys(keyboard._Key.ENTER))
    elif pins.digital_read_pin(DigitalPin.P0) == 1:
        pass
basic.forever(on_forever)
