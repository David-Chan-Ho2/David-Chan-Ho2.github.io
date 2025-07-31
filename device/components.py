import dht
from machine import Pin, I2C
from ssd1306 import SSD1306_I2C

# DHT11 setup
def DHT(pin):
    dht_pin = Pin(pin)
    return dht.DHT11(dht_pin)

# LED
def LED(pin):
    return Pin(pin, Pin.OUT)

# OLED Display
class OLED():
    
    def __init__(self, sda_pin, scl_pin):
        i2c = I2C(1, sda=Pin(sda_pin), scl=Pin(scl_pin))
        self.dsp = SSD1306_I2C(128, 64, i2c, addr = 0x3c)
        
    def show(self):
        self.dsp.show()
        
    def clear(self):
        self.dsp.fill(0)
    
    def text(self, msg, hor, vert):
        self.dsp.text(msg, hor, vert)

        
    