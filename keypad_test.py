import gpiozero as zero
from time import time, sleep

ENTER = '#'
RESET = '*'

pin_def = {"rows":['GPIO14','GPIO15','GPIO18','GPIO23'],
           "cols":['GPIO24','GPIO25','GPIO08','GPIO07']}

button_map = {
    'GPIO14GPIO24':'1',
    'GPIO14GPIO25':'2',
    'GPIO14GPIO8' :'3',
    'GPIO15GPIO24':'4',
    'GPIO15GPIO25':'5',
    'GPIO15GPIO8' :'6',
    'GPIO18GPIO24':'7',
    'GPIO18GPIO25':'8',
    'GPIO18GPIO8' :'9',
    'GPIO23GPIO25':'0',
    'GPIO14GPIO7' :'A',
    'GPIO15GPIO7' :'B',
    'GPIO18GPIO7' :'C',
    'GPIO23GPIO7' :'D',
    'GPIO23GPIO24':'*',
    'GPIO23GPIO8' :'#'
    }


class ResetInterrupt(Exception):
    pass

data_pins = []
for pin in pin_def['rows']:
    data_pins.append(zero.DigitalOutputDevice(pin,active_high=False,initial_value=True))
for pin in pin_def['cols']:
    data_pins.append(zero.DigitalInputDevice(pin,pull_up=True))


def check_input(interupt_enabled=True):
    for row in data_pins[:4]:
        row.on()
        sleep(0.01)
        for col in data_pins[4:]: 
            if col.value:
                while col.value: continue
                row.off()
                button = button_map[str(row.pin)+str(col.pin)]
                if interupt_enabled and button is RESET:
                    raise ResetInterrupt
                return button
        row.off()
    return None

def get_input_string():
    input_string = ''
    enter = False
    while (not enter):
        button = get_input(doBeep=True)
        if button is ENTER:
            enter = True
        else:
            input_string += button
    return input_string

def get_input(doBeep=False):
    while True:
        button = check_input()
        if button:
            if doBeep:
                beep()
            return button

def beep(repeat=1):
    buz = zero.PWMOutputDevice('GPIO1')
    for _ in range(repeat):
        buz.value = 0.2
        sleep(0.1)
        buz.off()
        sleep(0.1)

def main():
    while True:
        button = get_input()
        print(button)
        beep(2)

if __name__ == '__main__':
    main()
