 
//#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

#define  Device_Folder   "devices"
#define  Device_Label    "esp32cam"   

const char* ssid = "Orange5G-0358";
const char* password = "y2jdZqwA";
const char* mqtt_server = "192.168.1.132";
const char* mqtt_userName = "tfg";
const char* mqtt_passKey = "46132";  

//Certificado TLS
const char* ca_cert = \ 
"-----BEGIN CERTIFICATE-----\n" \
"MIID9zCCAt+gAwIBAgIUUWwTU/T05ZlUelxTchgMCYMyyPMwDQYJKoZIhvcNAQEL\n" \
"BQAwgYoxCzAJBgNVBAYTAkVTMREwDwYDVQQIDAhWYWxlbmNpYTERMA8GA1UEBwwI\n" \
"VmFsZW5jaWExDDAKBgNVBAoMA1VwdjEMMAoGA1UECwwDVXB2MRYwFAYDVQQDDA0x\n" \
"OTIuMTY4LjEuMTMyMSEwHwYJKoZIhvcNAQkBFhJtYWhlZGVyb0BnbWFpbC5jb20w\n" \
"HhcNMjAwNDA4MDkwMjE1WhcNMjUwNDA4MDkwMjE1WjCBijELMAkGA1UEBhMCRVMx\n" \
"ETAPBgNVBAgMCFZhbGVuY2lhMREwDwYDVQQHDAhWYWxlbmNpYTEMMAoGA1UECgwD\n" \
"VXB2MQwwCgYDVQQLDANVcHYxFjAUBgNVBAMMDTE5Mi4xNjguMS4xMzIxITAfBgkq\n" \
"hkiG9w0BCQEWEm1haGVkZXJvQGdtYWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\n" \
"ggEPADCCAQoCggEBANe/A4RsOuxUXKrF2OmEg1CNMLb2iOhXF3x+X1y/WryQVPdy\n" \
"XK5Wkjog2XFW4KC8LuiBASWqVZEETgAzlfhwB7KssnTU6Y4gaRnO6dgfeE/pSa16\n" \
"F7vGrlhLuH3D5viaYTMXBb7gZLi8zKh7taKY5r25ByHnKQUyN5p4Di1KS3r1I9se\n" \
"LCfMUJz46eSsXtJ0e2gOVn+piXWJNPOU+6zl2nxGfrLvMxpQqvYe34FSQ0ZhA4yQ\n" \
"FFDreZKkseNyh62nPo7MhRREKEZ2ngXevtFyoUdkhQKuN4x7eu7OHO8RNVVHjDFC\n" \
"YB1b0YGnQpA7uFmEc/GEGTg9aqqjlJqwd9QY3w8CAwEAAaNTMFEwHQYDVR0OBBYE\n" \
"FM8UjsJtUQo0rCZMycvZTzNlbGV0MB8GA1UdIwQYMBaAFM8UjsJtUQo0rCZMycvZ\n" \
"TzNlbGV0MA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAIEJsU9F\n" \
"vU2ganY+MxBWp0Qbz5ZpYXPEwZ5yZ49gftvrTjnWaq/DJOesOXSkgFvLJESGPFIS\n" \
"WtaCf64Pf1aIuUx7Jvuu+YDcp4XdNvNH7hssXzqyJe9ZFgrkXhT/tTY+4bJD8w27\n" \
"/n4QTAigvOOTHcQIg/XhWR925dUUMvd9jN402quGWogAialQMTLnVa7PLtpjto0w\n" \
"tQavNPrd+rDRguIhNI+k1Ac3lLWHjroy5rD13j6lB0I6LeIVfKoKyZ18zxZCZ4HD\n" \
"HOHYPumrWUGOPrdlhvREoapRdPsVNAIegcw8zH2XcBY24lZP6/pQf6V28ZcB+S1Z\n" \
"Ih8VQO9SuK0KWUA=\n" \
"-----END CERTIFICATE-----\n";

char  MQTT_CLIENT_NAME[12];  // Receives the MAC address in setup to have a unique MQTT client Name 
char  topicSubscribe[100];
char  payload[100];
char  topic[150];
char  msg[50];
int   value = 0;
int   ledPin = 2;

// Camera related
#include "esp_camera.h"
#include "esp_timer.h"
#include "img_converters.h"

#include "fb_gfx.h"
#include "fd_forward.h"
#include "fr_forward.h"


// Camara buffer, URL y nombre de la imagen
camera_fb_t *fb = NULL;

//DHTesp     dht;
WiFiClientSecure espClient;
PubSubClient client(espClient);

void init_wifi() {
  // Empezamos conectando a la red wifi especificada
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}


void callback(char* topic, byte *payload, unsigned int length) {
    Serial.println("-------new message from broker-----");
    Serial.print("channel:");
    Serial.println(topic);
    Serial.print("data:");  
    Serial.write(payload, length);
    Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Creación de una ID aleatoria 
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(),mqtt_userName,mqtt_passKey)) {
      Serial.println("connected");
      //clientSubscribe("led01");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  init_wifi();
  espClient.setCACert(ca_cert);
  client.setServer(mqtt_server, 8883);
  client.setCallback(callback);
  
  // Initialize and configure camera
  camera_init();
}

void loop() {
  static long lastPublish = 0;
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  if (millis() - lastPublish > 15000) {
    lastPublish = millis();
    publishPic();
  }
}


//void onMqttConnect(bool sessionPresent){
void publishPic(){
  static int counter=0;
  // Take picture
  //delay(2000);
  take_picture();
  //delay(11000);  
  sprintf(topic, "/%s/%s/%s", Device_Folder, Device_Label,"imagem");
  // Publish picture
 
  const char* pic_buf =(const char*)(fb->buf);
  size_t length=fb->len; 
  
  uint16_t packetIdPubTemp = client.publish_P("ETSIT",fb->buf, fb->len,false);
  client.publish_P("agora",fb->buf, fb->len,false);
  client.publish_P("casaAlumno",fb->buf, fb->len,false);


  Serial.println("Publicado");
  
  // No delay result in no message sent.
  delay(5000);
  esp_camera_fb_return(fb);   //libera memória da camera
  

 
  if (counter == 2){
    ESP.restart();
  }
}

void printHex(uint8_t num) {
  char hexCar[2];
  sprintf(hexCar, "%02X", num);
  Serial.print(hexCar);
}

bool take_picture(){
  Serial.println("Capturando imagen");

  fb = esp_camera_fb_get();  
  if(!fb)  {
    Serial.println("Captura fallida");
    return false;
  }
  Serial.print("Captura de la imagen exitosa: ");
  Serial.println(fb->format);
 
 
  return true;
}

bool camera_init(){
 
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer   = LEDC_TIMER_0;
  config.pin_d0       = 5;
  config.pin_d1       = 18;
  config.pin_d2       = 19;
  config.pin_d3       = 21;
  config.pin_d4       = 36;
  config.pin_d5       = 39;
  config.pin_d6       = 34;
  config.pin_d7       = 35;
  config.pin_xclk     = 0;
  config.pin_pclk     = 22;
  config.pin_vsync    = 25;
  config.pin_href     = 23;
  config.pin_sscb_sda = 26;
  config.pin_sscb_scl = 27;
  config.pin_pwdn     = 32;
  config.pin_reset    = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  config.frame_size   = FRAMESIZE_QQVGA; // set picture size, FRAMESIZE_QQVGA = 160x120
  config.jpeg_quality = 10;            // quality of JPEG output. 0-63 lower means higher quality
  config.fb_count     = 2;

  // Inicialización de la cámara
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK){
    Serial.print("Camera init failed with error 0x%x");
    Serial.println(err);
    return false;
  }

  // Change extra settings if required
  //sensor_t * s = esp_camera_sensor_get();
  //s->set_vflip(s, 0);       //flip it back
  //s->set_brightness(s, 1);  //up the blightness just a bit
  //s->set_saturation(s, -2); //lower the saturation

  else  {
    return true;
  }
  
}
