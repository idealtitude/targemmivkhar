# targemmivkhar

**Targem Mivkhar**, it's Hebrew (תרגם מבחר), and it means "Translate Selection".

Go to this [Google Translate page](https://translate.google.fr/?sl=iw&tl=en&text=%D7%AA%D7%A8%D7%92%D7%9D%20%D7%9E%D7%91%D7%97%D7%A8&op=translate) to read and hear the translation, so that you'll know how to pronounce this Hebrew expression.

![targem Mivkhar Logo](./targemmivkhar.png)

### /!\ Warning

**This is a Work In Progress!**

The extension is only done very partially, not all functionalities work. Particularly the options page that is a very messy, it's not usable for the moment.

## Presentation

This is an extension for Firefox that add an option in the contextual menu and open Google Translate with the selected text... to translate it.

I made it because I was fed up to select and copy texts I want to translate, then open another tab and go to Google Translate, then paste the text, sleect the langguages...

So I made this extension.

**Note:** in the current Firefox version I have, *132.0.1*, there's an experimental feature, available from the contextual menu, that does quite the same thing, except that it opens a popup and queries Google Translate to present a translation directly in the popup; plus it has several options and settings available.

If you're afer something more sophisticated than my poor little extension, then you'll probably be better to use that native Firefox translation feature!

## Features

**Targem Mivkhar** (from now on I'll call it **Targem** for short), has the follwoing features:

* [x] add an option to the contextual menu to translate selected text; the target language is English by default
* [ ] an options page where you can:
    1. [x] Add any number of target languages from a predefined list
    2. [x] Add any language from a language abbreviation code (ex. "he" for Hebrew)
    3. [ ] Choose in the contextual menu which of these target langiages you want to use (not implemented yet!)

## Installation

1. Download/CLone this repository, or download a [release](https://github.com/idealtitude/targemmivkhar/releases)
2. In Firefox, in the extensions manager, choose "Install from file"
3. Select `manfiest.json` in the [targem sub folder](./targem/manifest.json)

## Usage

And you're done! Now you'll have the additional option in the contextual menu: *Translate Selection With Google Translate*.

To add other target lnaguages other than the default English target, go the extension preferences where you'll be able to add any langues you want.

## TODO's

Improve, enhance, beautify the UX for the options page.

## Contributing

If you like this small project and are intersted to contribute, you'll be warmly welcome! It's my first time creating and sharing a Firefox extension, and any help we'll be greatly appreciated.
