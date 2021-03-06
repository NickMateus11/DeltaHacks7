import time
import gpiozero as zero
import keypad_test as kp
 
workLED = zero.LED('GPIO21')
breakLED = zero.LED('GPIO20')

ontime = int(kp.get_input())
print(f"Work time: {ontime}")
offtime = int(kp.get_input())
print(f"Break time: {offtime}")
start = time.time()
workLED.on()

elapsed = 0
while (elapsed < ontime):
    elapsed = time.time() - start
print("On time finish")
kp.beep(5)
workLED.off()
breakLED.on()
 
elapsed = 0
newtime = time.time()
while (elapsed < offtime):
    elapsed = time.time() - newtime
print("Off time finish")
kp.beep(5)
breakLED.off()
