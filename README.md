## EmojiPicker
This plugin allows you to search emoji through an API.  
Once you've added the emoji picker form widget to your form:
- use it to search emoji by keywords
- click on the emoji you want to copy
- paste it to the field you want

![emoji-picker](https://user-images.githubusercontent.com/53976837/116868116-7c4ef100-ac0e-11eb-88bb-ecd74a632674.gif)

#### Requirements
To use this plugin, you'll need to create an API key from [Emoji-API.com](https://emoji-api.com)
and fill your credentials on the backend settings

#### How to use
When you want to display the widget, just use it in your fields.yaml file.  
Because this field is not intended to receive or return any value,
you need to prefix it by an underscore :
```yaml
form:
    fields:
        _emoji:
            label: Emoji Picker
            type: emojipicker
```


