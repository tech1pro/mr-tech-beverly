# Updating free items

Edit `free-items.json` in the GitHub repository and commit the change. GitHub Pages publishes that inventory with the website. This is a shared public list, not browser-local storage.

Start with an empty list (`[]`) when nothing is available. For each real item, add an object like this:

```json
[
  {
    "title": "Replace with the actual item name",
    "status": "available",
    "description": "Describe condition, testing, included accessories, and any known problems.",
    "image": "images/item-photo.jpg"
  }
]
```

The image is optional. Upload a real photo to the `images` folder if you include one. Set status to `available`, `pending`, or `claimed`; remove entries when you no longer want to show them. Separate multiple objects with commas.

Do not publish personal files, serial numbers, contact details of recipients, or photos showing private customer data. Confirm the item is ready to hand over before listing it. Call/pickup arrangements are handled by the shop; the website does not reserve items.
