# obs-dj-overlay

*obs-dj-overlay* is a collection of small components that can
be used in combination with [OBS](https://obsproject.com/)’s
Browser source to render an overlay with various information.

It has been created with for DJs who are streaming music to
a video platform such as [Twitch](https://twitch.tv/) and who
want to include some information about the tracks they are
currently playing.

![Screenshot of the admin interface](images/admin-interface.png)

This screenshot shows most of obs-dj-overlay’s features in
action. On the left side there are input fields for everything
you can change during runtime, on the right side there’s a
preview of the rendered overlay, the current stream on
Twitch and the Twitch chat.

The different sections in the admin interface are independent
from one another, i.e. you can change track info without at
the same time changing the show info. Modified fields are
shown in red to give a clear indication that unsaved data is
present.

The preview looks different from the Twitch stream because
OBS’s Browser source can apply custom CSS to the preview to
change its appearance.

## Configuring It

If you want to include a viewer count for a Twitch account
you need register an application with Twitch, generate a
client secret, copy `src/config.template.json` to `src/config.json`
and enter both client ID and client secret in `src/config.json`.

That’s it.

## Using It

1. Start the backend:

   ```
   # cd backend
   # npm start
   ```

    This will start the backend on port 5001. Don’t go there with
    your browser, there’s nothing to see. :)
    
1. Now build and serve the frontend:

    ```
    # cd frontend
    # yarn build
    # serve -s build
    ```

1. Point the Browser source to `http://localhost:5000/`. Also, point
your browser to `http://localhost:5000/` and click anywhere to get
to the admin interface. You can also directly head to
`http://localhost:5000/admin` if your prefer.

## Customizing It

All data that is displayed can be modified from the web interface.
Different sections are defined and all data within a section is updated
at the same time and independent from data from other sections. That
means that you can change the message without updating it and then
change the track information without the message also being set.

All input fields have slightly modified behaviour to allow an improved
workflow.

* All text of an input field will be selected if an input field is clicked or
navigated to, allowing easy replacement of all text.
* Pressing enter will only send the data to the backend once you are in
the last input field of the section. This allows very convenient multi-field
data entry without sending intermediate state (i.e. updated artist but old
title of a track) to the backend (and the rendered overlay).
* When the track number is not 0 and it equals the current number being
shown and the artist and/or track is changed, the track number is
automatically incremented. If you want to change the number to an
arbitrary position, make sure to change it before the artist and title.
* The message has a multi-line input field that can be sent using
Ctrl-Enter, after which all of the text will be selected for easy
replacement.

In OBS you can apply a CSS override in the Browser source’s
configuration. The following classes are used by the rendered overlay: 

* `Viewer`: Main CSS class, font properties are defined here.
* `Background`: Defines the background image.
* `TitleInfo` (contains `Title` and `Subtitle`): Controls display of
the title information.
* `Clock`: Controls display of the clock.
* `TwitchViewerCount` (contains `Icon` and `Count`): Controls
display of the Twitch viewer count.
* `TrackInfo` (contains `Number`, `Artist` and `Title`): Controls
display of the track information.
* `Message` (contains `Text`): Controls display of the message.
* `NextShow` (contains `Text`): Controls display of the “next
show” announcement.
