# obs-overlay

*obs-overlay* is a collection of small components that I use in
combination with [OBS’s](https://obsproject.com/) Browser
source to render an overlay with various information.

## Configuring It

If you want to include a viewer count for a Twitch account
you need register an application with Twitch, generate a
client secret, copy `src/config.template.json` to `src/config.json`
and enter both client ID and client secret in `src/config.json`.

That’s it.

## Using It

1. Build and serve the application:

    ```
    # yarn build
    # serve -s build
    ```

2. Point the Browser source to `http://localhost:5000/`.

## Customizing It

You can modify the file `build/overlay.json` to change some of
the information that is displayed.

* `track.artist` and `track.title`: The artist and title of the
currently running track. When both `track` and `artist` are
empty, the track info block is not shown.
* `track.number`: The number of the currently running track.
Display of the number will be omitted if this is empty or 0,
and it will be ignored if both `artist` and `track` are empty.
* `show.title` and `show.subtitle` can be set to include a large
display for the show’s title.
* `nextShow`: An announcement for the next show (optional).
* `twitchUserName`: A [Twitch](https://twitch.tv/) user name to
get the viewer count for (optional).

You can also override the CSS classes in OBS’s Browser source:

* `App`: Main CSS class, font properties are defined here.
* `Background`: Defines the background image.
* `TitleInfo` (contains `Title` and `Subtitle`): Controls display of
the title information.
* `Clock`: Controls display of the clock.
* `TwitchViewerCount` (contains `Icon` and `Count`): Controls
display of the Twitch viewer count.
* `TrackInfo` (contains `Number`, `Artist` and `Title`): Controls
display of the track information.
* `NextShow` (contains `Text`): Controls display of the “next
show” announcement.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
