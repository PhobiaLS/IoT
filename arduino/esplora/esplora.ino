/*
LOxxx|xxx|xxx|xxxx|xxxx - turn on led R | G | B | signal | delay ( ne salju se uspravne crte samo brojevi jedan do drugog)
LF - turn off led
BOxxxxxxxx - buzzer turn on
BF - buzzer turn off
M - read microphone
T - temperature read
Q - light sensor read
S - slider read
J - joystick read
A - accelerometar read
W - read button pressed
*/

#include <Esplora.h>

char c, t;
String s;
int red, green, blue;
int signal, pause;
int frequency;
long duration;
int value;
int loudness;
int xValue;
int yValue;
int button;
int xAxis;
int yAxis;
int zAxis;
int celsius;
int fahrenheit;
int swl, swr, swu, swd;
int lswl = 0, lswr = 0, lswu = 0, lswd = 0;
int lxValue = 0, lyValue = 0, lbutton = 0;

unsigned long previousMillis = 0;
unsigned long currentMillis = 0;

unsigned long previousMillisB = 0;
unsigned long currentMillisB = 0;
unsigned long pauseB = 50;

unsigned long previousMillisJ = 0;
unsigned long currentMillisJ = 0;
unsigned long pauseJ = 50;

void setup() {
  Serial.begin(9600);
}

void loop() {
  currentMillis = millis();
  currentMillisB = millis();
  currentMillisJ = millis();
  
  if (currentMillisJ - previousMillisJ >= pauseJ)
  {
    previousMillisJ = currentMillisJ;
    xValue = Esplora.readJoystickX();
    yValue = Esplora.readJoystickY();
    button = Esplora.readJoystickSwitch();
    if (abs(xValue - lxValue) >= 10 || abs(yValue - lyValue) >= 10 || button != lbutton)
      Serial.println("{ \"joystickX\" : " + String(xValue) + ", \"joystickY\" : " + yValue + ", \"button\" : " + button + " }");
    lxValue = xValue;
    lyValue = yValue;
    lbutton = button;
  }
  
  if (currentMillisB - previousMillisB >= pauseB)
  {
    previousMillisB = currentMillisB;
    swd = Esplora.readButton(SWITCH_DOWN);
    swu = Esplora.readButton(SWITCH_UP);
    swl = Esplora.readButton(SWITCH_LEFT);
    swr = Esplora.readButton(SWITCH_RIGHT);
    if (lswd != swd || lswu != swu || lswl != swl || lswr != swr)
      Serial.println("{ \"up\" : " + String(swu) + ", \"down\" : " + String(swd) + ", \"left\" : " + String(swl) + ", \"right\" : " + swr + " }");  
    lswd = swd;
    lswu = swu;
    lswl = swl;
    lswr = swr;
  }
  
  if (currentMillis - previousMillis >= signal) 
  {
    Esplora.writeRGB(red, green, blue); 
  }
  
  if (currentMillis - previousMillis >= pause + signal)
  {
    previousMillis = currentMillis;
    Esplora.writeRGB(0, 0, 0);
  }
  
  if (Serial.available())
  {
    c = Serial.read();
    switch (c)
    {
      case 'L':
        s = "";
        while (!Serial.available()) {}
        t = Serial.read();
        
        if (t == 'F')
        {
          Esplora.writeRGB(0, 0, 0); 
        }
        else
        {
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          red = s.toInt();
          
          s = "";      
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          green = s.toInt();
          
          s = "";
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          blue = s.toInt();
          
          s = "";
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          signal = s.toInt();
          
          s = "";
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          pause = s.toInt();
          
          Serial.println("LED");
          Esplora.writeRGB(red, green, blue);
        } 
        break;
      case 'B':
        s = "";
        while (!Serial.available()) {}
        t = Serial.read();
        
        if (t == 'F')
        {
          Esplora.noTone();
        }
        else
        {
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          frequency = s.toInt();
          
          s = "";
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          while (!Serial.available()) {}
          c = Serial.read();
          s += c;
          
          duration = s.toInt();
          
          Esplora.tone(frequency, duration);
          Serial.println("TON");
        }
        break;
      case 'M':
        loudness = Esplora.readMicrophone();
        Serial.println("{ \"loudness\": " + String(loudness) + " }");
        break;
      case 'T':
        celsius = Esplora.readTemperature(DEGREES_C);
        fahrenheit = Esplora.readTemperature(DEGREES_F);
        Serial.println("{ \"celsius\" : " + String(celsius) + ", \"fahrenheit\" : " + String(fahrenheit) + " }");
        break;
      case 'Q':
        value = Esplora.readLightSensor();
        Serial.println("{ \"light\" : " + String(value) + " }");
        break;
      case 'S':
        value = Esplora.readSlider();
        Serial.println("{ \"slider\" : " + String(value) + " }");
        break;
      case 'J':
        xValue = Esplora.readJoystickX();
        yValue = Esplora.readJoystickY();
        button = Esplora.readJoystickSwitch();
        Serial.println("{ \"joystickX\" : " + String(xValue) + ", \"joystickY\" : " + yValue + ", \"button\" : " + button + " }"); 
        break;
      case 'A':
        xAxis = Esplora.readAccelerometer(X_AXIS);
        yAxis = Esplora.readAccelerometer(Y_AXIS);
        zAxis = Esplora.readAccelerometer(Z_AXIS);
        Serial.println("{ \"axisX\" : " + String(xAxis) + ", \"axisY\" : " + yAxis + ", \"axisZ\" : " + String(zAxis) + " }");
        break;
      case 'W':
        swd = Esplora.readButton(SWITCH_DOWN);
        swu = Esplora.readButton(SWITCH_UP);
        swl = Esplora.readButton(SWITCH_LEFT);
        swr = Esplora.readButton(SWITCH_RIGHT);
        Serial.println("{ \"up\" : " + String(swu) + ", \"down\" : " + String(swd) + ", \"left\" : " + String(swl) + ", \"right\" : " + swr + " }");
        break;
    }
  }
}
