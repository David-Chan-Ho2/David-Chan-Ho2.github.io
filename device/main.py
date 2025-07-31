from components import DHT, LED, OLED
from wifi import connect_wifi
from secrets import secrets
from thingspeak import send_to_thingspeak
import time

# WiFi credentials
SSID = secrets['SSID']
PASSWORD = secrets['PASSWORD']

# ThingSpeak credentials
THINGSPEAK_API_KEY = secrets['THINGSPEAK_API_KEY']
THINGSPEAK_URL = 'https://api.thingspeak.com/update'

# Pins
DHT_PIN=17
LED_PIN=16
SDA_PIN=2
SCL_PIN=3

# DHT11 setup
sensor = DHT(DHT_PIN)

# LED setup
led = LED(LED_PIN)

# OLED setup
oled = OLED(SDA_PIN, SCL_PIN)

# Connect to wifi
connect_wifi(SSID, PASSWORD)
print()

# Turn led on
led.on()

# Main loop
while True:
    try:
        sensor.measure()
        temperature = sensor.temperature()
        humidity = sensor.humidity()
        print(f"Temp: {temperature}°C, Humidity: {humidity}%")
        print()
        
        oled.clear()
        oled.text(f"Temp: {temperature}C", 0, 0)
        oled.text(f"HUM: {humidity}%", 0, 11)
        oled.show()
 
        send_to_thingspeak(THINGSPEAK_URL,THINGSPEAK_API_KEY,(temperature,humidity))
    except KeyboardInterrupt as e:
        led.off()
        oled.clear()
        print("Exitting...")
    except Exception as e:
        print("Sensor error:", e)

    time.sleep(15)  # ThingSpeak minimum update interval
