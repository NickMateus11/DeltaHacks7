import gpiozero as zero
from time import time, sleep

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


data_pins = []
for pin in pin_def['rows']:
    data_pins.append(zero.DigitalOutputDevice(pin,active_high=False,initial_value=True))
for pin in pin_def['cols']:
    data_pins.append(zero.DigitalInputDevice(pin,pull_up=True))


def check_input():
    for row in data_pins[:4]:
        row.on()
        sleep(0.01)
        for col in data_pins[4:]: 
            if col.value:
                while col.value: continue
                row.off()
                return button_map[str(row.pin)+str(col.pin)]
        row.off()
    return None


def get_input():
    while True:
        button = check_input()
        if button:
            return button

def beep(repeat=2):
    buz = zero.PWMOutputDevice('GPIO1')
    for _ in range(repeat):
        buz.value = 0.1
        sleep(0.1)
        buz.off()
        sleep(0.1)

def main():
    while True:
        button = get_input()
        print(button)
        beep()

if __name__ == '__main__':
    main()
