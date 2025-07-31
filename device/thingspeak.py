import urequests

# Send data to ThingSpeak
def send_to_thingspeak(THINGSPEAK_URL, THINGSPEAK_API_KEY, data):
    try:
        format_data = ""
        for i, d in enumerate(data):
            format_data += f"&field{i+1}={d}"
        response = urequests.get(
            f"{THINGSPEAK_URL}?api_key={THINGSPEAK_API_KEY}{format_data}"
        )
        print("ThingSpeak response:", response.text)
        response.close()
    except Exception as e:
        print("Failed to send data:", e)