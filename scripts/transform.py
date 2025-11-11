# import json
# from datetime import datetime
# from zoneinfo import ZoneInfo


# with open("dump.json", "r") as f:
#     data = json.load(f)

# def to_ist(timestr):
#     utc_dt = datetime.strptime(timestr, "%Y-%m-%d %H:%M:%S")
#     utc_dt = utc_dt.replace(tzinfo=ZoneInfo("UTC"))
#     ist_dt = utc_dt.astimezone(ZoneInfo("Asia/Kolkata"))
#     return ist_dt.strftime("%Y-%m-%d %H:%M:%S")

# #print(json.dumps(data, indent=4))

# data_improv =  [
#    {
#         "title": topic.get("title"),
#         "fancy title": topic.get("fancy_title"),
#         "excerpt": topic.get("excerpt"),
#         "image_url": topic.get("image_url"),
#         "thumbnails": topic.get("thumbnails"),
#         "event_starts_at": to_ist(topic.get("event_starts_at")), 
#         "event_ends_at": to_ist(topic.get("event_ends_at")),
#        "featured_link": topic.get("featured_link"),
#        "slug": topic.get("slug"),
#          "url": "https://www.district.in/events/" + topic.get("slug")+"-buy-tickets",
#    }
#    for topic in data['topic_list']['topics'] 
#    if 'improv' in topic['title'].lower()
# ]

# print(json.dumps(data_improv, indent=4))

# with open("frontend/src/output.json", "w") as f:
#    json.dump(data_improv, f, indent=4)



import json
import requests
from datetime import datetime
from zoneinfo import ZoneInfo
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(BASE_DIR, "frontend", "src", "output.json")


with open("dump.json", "r") as f:
    data = json.load(f)

def to_ist(timestr):
    if not timestr:
        return None
    utc_dt = datetime.strptime(timestr, "%Y-%m-%d %H:%M:%S")
    utc_dt = utc_dt.replace(tzinfo=ZoneInfo("UTC"))
    ist_dt = utc_dt.astimezone(ZoneInfo("Asia/Kolkata"))
    return ist_dt.strftime("%Y-%m-%d %H:%M:%S")

data_improv = []

for topic in data["topic_list"]["topics"]:
    if "improv" in topic["title"].lower():
        topic_id = topic["id"]
        slug = topic["slug"]

        # ✅ fetch full topic JSON
        detail_url = f"https://underline.center/t/{slug}/{topic_id}.json"
        detail = requests.get(detail_url).json()

        # first post (OP)
        first_post = detail["post_stream"]["posts"][0]
        full_content = first_post.get("raw")  # or use "cooked" for HTML

        entry = {
            "title": topic.get("title"),
            "fancy title": topic.get("fancy_title"),
            "excerpt": topic.get("excerpt"),  # still useful preview
            "full_content": full_content,     # ✅ full text here
            "image_url": topic.get("image_url"),
            "thumbnails": topic.get("thumbnails"),
            "event_starts_at": to_ist(topic.get("event_starts_at")),
            "event_ends_at": to_ist(topic.get("event_ends_at")),
            "featured_link": topic.get("featured_link"),
            "slug": slug,
            "url": f"https://www.district.in/events/{slug}-buy-tickets",
        }

        data_improv.append(entry)

print(json.dumps(data_improv, indent=4))

with open(OUTPUT_PATH, "w") as f:
    json.dump(data_improv, f, indent=4)
