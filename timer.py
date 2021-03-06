import time
import gpiozero as zero
import keypad_test as kp

workLED = zero.LED('GPIO21')
breakLED = zero.LED('GPIO20')

def workTimeSet():
    workLED.blink(0.5,0.5)
    ontime = int(kp.get_input_string())
    workLED.off()
    print(f"Work time: {ontime}")
    return ontime

def breakTimeSet():
    breakLED.blink(0.5,0.5)
    breaktime = int(kp.get_input_string())
    breakLED.off()
    print(f"Break time: {breaktime}")
    return breaktime

def cyclesSet():
    workLED.blink(0.5,0.5)
    breakLED.blink(0.5,0.5)
    cycles = int(kp.get_input_string())
    breakLED.off()
    workLED.off()
    print(f"Cycles: {cycles}")
    return cycles

def Pom():
    try:
        work_time = workTimeSet()
        break_time = breakTimeSet()
        cycles = cyclesSet()
        # sending POST to backend

        workLED.on()
        breakLED.off()
        for i in range(2*cycles):
            start_time = time.time()
            timer_time = work_time if not i%2 else break_time
            elapsed = 0
            while (elapsed < timer_time):
                kp.check_input()
                elapsed = time.time() - start_time
            print(f"{'Work' if not i%2 else 'Break'} time finished")
            if i<2*cycles-1:
                kp.beep(5)
                workLED.toggle()
                breakLED.toggle()

        workLED.blink(0.5,0.5)
        breakLED.blink(0.5,0.5)
        kp.beep(10)
        time.sleep(1)
        kp.beep(10)

    except kp.ResetInterrupt:
        workLED.blink(0.2,0.2)
        breakLED.blink(0.2,0.2)
        kp.beep(10)
        workLED.off()
        breakLED.off()
        print("Reset Interrupt")

def main():
    try:
        Pom()
        while True:
            if kp.check_input(interupt_enabled=False) is kp.RESET:
                kp.beep(3)
                Pom()
    except KeyboardInterrupt:
        pass            

    workLED.close()
    breakLED.close()

if __name__ == '__main__':
    main()
