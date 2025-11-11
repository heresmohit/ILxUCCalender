
import ssl, certifi, urllib.request, json
ctx = ssl.create_default_context(cafile=certifi.where())

url = "https://underline.center/latest.json"
url2 = "https://underline.center/c/calendar/5.json"
response = urllib.request.urlopen(url2, context=ctx)
data = json.loads(response.read().decode("utf-8"))
with open("dump.json", "w") as f:
   json.dump(data, f, indent=4)

