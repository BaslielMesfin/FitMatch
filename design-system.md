Designing for iOS
People depend on their iPhone to help them stay connected, play games, view media, accomplish tasks, and track personal data in any location and while on the go.
A stylized representation of an iPhone frame shown on top of a grid. The image is overlaid with rectangular and circular grid lines and is tinted green to subtly reflect the green in the original six-color Apple logo.

As you begin designing your app or game for iOS, start by understanding the following fundamental device characteristics and patterns that distinguish the iOS experience. Using these characteristics and patterns to inform your design decisions can help you provide an app or game that iPhone users appreciate.

Display. iPhone has a medium-size, high-resolution display.

Ergonomics. People generally hold their iPhone in one or both hands as they interact with it, switching between landscape and portrait orientations as needed. While people are interacting with the device, their viewing distance tends to be no more than a foot or two.

Inputs. Multi-Touch gestures, virtual keyboards, and voice control let people perform actions and accomplish meaningful tasks while they’re on the go. In addition, people often want apps to use their personal data and input from the device’s gyroscope and accelerometer, and they may also want to participate in spatial interactions.

App interactions. Sometimes, people spend just a minute or two checking on event or social media updates, tracking data, or sending messages. At other times, people can spend an hour or more browsing the web, playing games, or enjoying media. People typically have multiple apps open at the same time, and they appreciate switching frequently among them.

System features. iOS provides several features that help people interact with the system and their apps in familiar, consistent ways.

Widgets

Home Screen quick actions

Spotlight

Shortcuts

Activity views

Best practices
Great iPhone experiences integrate the platform and device capabilities that people value most. To help your design feel at home in iOS, prioritize the following ways to incorporate these features and capabilities.

Help people concentrate on primary tasks and content by limiting the number of onscreen controls while making secondary details and actions discoverable with minimal interaction.

Adapt seamlessly to appearance changes — like device orientation, Dark Mode, and Dynamic Type — letting people choose the configurations that work best for them.

Support interactions that accommodate the way people usually hold their device. For example, it tends to be easier and more comfortable for people to reach a control when it’s located in the middle or bottom area of the display, so it’s especially important let people swipe to navigate back or initiate actions in a list row.

With people’s permission, integrate information available through platform capabilities in ways that enhance the experience without asking people to enter data. For example, you might accept payments, provide security through biometric authentication, or offer features that use the device’s location.

Resources
Related
Apple Design Resources

Developer documentation
iOS Pathway


Designing for macOS
People rely on the power, spaciousness, and flexibility of a Mac as they perform in-depth productivity tasks, view media or content, and play games, often using several apps at once.
A stylized representation of a Mac shown on top of a grid. The image is overlaid with rectangular and circular grid lines and is tinted green to subtly reflect the green in the original six-color Apple logo.

As you begin designing your app or game for macOS, start by understanding the fundamental device characteristics and patterns that distinguish the macOS experience. Using these characteristics and patterns to inform your design decisions can help you provide an app or game that Mac users appreciate.

Display. A Mac typically has a large, high-resolution display, and people can extend their workspace by connecting additional displays, including their iPad.

Ergonomics. People generally use a Mac while they’re stationary, often placing the device on a desk or table. In the typical use case, the viewing distance can range from about 1 to 3 feet.

Inputs. People expect to enter data and control the interface using any combination of input modes, such as physical Keyboards, Pointing devices, Game controls, and Siri.

App interactions. Interactions can last anywhere from a few minutes of performing some quick tasks to several hours of deep concentration. People frequently have multiple apps open at the same time, and they expect smooth transitions between active and inactive states as they switch from one app to another.

System features. macOS provides several features that help people interact with the system and their apps in familiar, consistent ways.

The menu bar

File management

Going full screen

Dock menus

Best practices
Great Mac experiences integrate the platform and device capabilities that people value most. To help your design feel at home in macOS, prioritize the following ways to incorporate these features and capabilities.

Leverage large displays to present more content in fewer nested levels and with less need for modality, while maintaining a comfortable information density that doesn’t make people strain to view the content they want.

Let people resize, hide, show, and move your windows to fit their work style and device configuration, and support full-screen mode to offer a distraction-free context.

Use the menu bar to give people easy access to all the commands they need to do things in your app.

Help people take advantage of high-precision input modes to perform pixel-perfect selections and edits.

Handle keyboard shortcuts to help people accelerate actions and use keyboard-only work styles.

Support personalization, letting people customize toolbars, configure windows to display the views they use most, and choose the colors and fonts they want to see in the interface.

Resources
Related
Apple Design Resources

Developer documentation
macOS Pathway


Accessibility
Accessible user interfaces empower everyone to have a great experience with your app or game.
A sketch of the Accessibility icon. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

When you design for accessibility, you reach a larger audience and create a more inclusive experience. An accessible interface allows people to experience your app or game regardless of their capabilities or how they use their devices. Accessibility makes information and interactions available to everyone. An accessible interface is:

Intuitive. Your interface uses familiar and consistent interactions that make tasks straightforward to perform.

Perceivable. Your interface doesn’t rely on any single method to convey information. People can access and interact with your content, whether they use sight, hearing, speech, or touch.

Adaptable. Your interface adapts to how people want to use their device, whether by supporting system accessibility features or letting people personalize settings.

As you design your app, audit the accessibility of your interface. Use Accessibility Inspector to highlight accessibility issues with your interface and to understand how your app represents itself to people using system accessibility features. You can also communicate how accessible your app is on the App Store using Accessibility Nutrition Labels. To learn more about how to evaluate and indicate accessibility feature support, see Accessibility Nutrition Labels in App Store Connect help.

Vision
An illustration containing five symbols associated with the topic of vision, including symbols representing text size, magnification, VoiceOver, and spoken dialogue.

The people who use your interface may be blind, color blind, or have low vision or light sensitivity. They may also be in situations where lighting conditions and screen brightness affect their ability to interact with your interface.

Support larger text sizes. Make sure people can adjust the size of your text or icons to make them more legible, visible, and comfortable to read. Ideally, give people the option to enlarge text by at least 200 percent (or 140 percent in watchOS apps). Your interface can support font size enlargement either through custom UI, or by adopting Dynamic Type. Dynamic Type is a systemwide setting that lets people adjust the size of text for comfort and legibility. For more guidance, see Supporting Dynamic Type.

Use recommended defaults for custom type sizes. Each platform has different default and minimum sizes for system-defined type styles to promote readability. If you’re using custom type styles, follow the recommended defaults.

Platform

Default size

Minimum size

iOS, iPadOS

17 pt

11 pt

macOS

13 pt

10 pt

tvOS

29 pt

23 pt

visionOS

17 pt

12 pt

watchOS

16 pt

12 pt

Bear in mind that font weight can also impact how easy text is to read. If you’re using a custom font with a thin weight, aim for larger than the recommended sizes to increase legibility. For more guidance, see Typography.

An illustration of a rectangular view containing the word 'Hello,' formatted bold, at a small font size.
Thicker weights are easier to read for smaller font sizes.

An illustration of a rectangular view containing the word 'Hello,' formatted thin, at a large font size.
Consider increasing the font size when using a thin weight.

Strive to meet color contrast minimum standards. To ensure all information in your app is legible, it’s important that there’s enough contrast between foreground text and icons and background colors. Two popular standards of measure for color contrast are the Web Content Accessibility Guidelines (WCAG) and the Accessible Perceptual Contrast Algorithm (APCA). Use standard contrast calculators to ensure your UI meets acceptable levels. Accessibility Inspector uses the following values from WCAG Level AA as guidance in determining whether your app’s colors have an acceptable contrast.

Text size

Text weight

Minimum contrast ratio

Up to 17 pts

All

4.5:1

18 pts

All

3:1

All

Bold

3:1

If your app doesn’t provide this minimum contrast by default, ensure it at least provides a higher contrast color scheme when the system setting Increase Contrast is turned on. If your app supports Dark Mode, make sure to check the minimum contrast in both light and dark appearances.

An illustration of a button that has insufficient contrast between the button's title and background.
A button with insufficient color contrast

An X in a circle to indicate incorrect usage.

An illustration of a button that has sufficient contrast between the button's title and background.
A button with sufficient color contrast

A checkmark in a circle to indicate correct usage.

Prefer system-defined colors. These colors have their own accessible variants that automatically adapt when people adjust their color preferences, such as enabling Increase Contrast or toggling between the light and dark appearances. For guidance, see Color.

An illustration demonstrating how the system-defined color red appears above a light and dark background. In the illustration, a circle is positioned above a rounded rectangle. The left side of the rounded rectangle is light in color, and the right side is dark. The left side of the circle is slightly darker than the right side.
The systemRed default color in iOS

An illustration demonstrating how the system-defined accessibility-specific color red appears above a light and dark background. In the illustration, a circle is positioned above a rounded rectangle. The left side of the rounded rectangle is light in color, and the right side is dark. The left side of the circle is considerably darker than the right side.
The systemRed accessible color in iOS

Convey information with more than color alone. Some people have trouble differentiating between certain colors and shades. For example, people who are color blind may have particular difficulty with pairings such as red-green and blue-orange. Offer visual indicators, like distinct shapes or icons, in addition to color to help people perceive differences in function and changes in state. Consider allowing people to customize color schemes such as chart colors or game characters so they can personalize your interface in a way that’s comfortable for them.

An illustration of a green circle to the left of a red circle.
For someone with red-green color blindness, these indicators might appear the same.

An X in a circle to indicate incorrect usage.

An illustration of a green circle containing a checkmark to the left of a red octagon containing an X.
Both visual indicators and color help differentiate between indicators.

A checkmark in a circle to indicate correct usage.

Describe your app’s interface and content for VoiceOver. VoiceOver is a screen reader that lets people experience your app’s interface without needing to see the screen. For more guidance, see VoiceOver.

Hearing
An illustration containing five symbols associated with the topic of hearing, including symbols representing sound, waveforms, and closed captioning.

The people who use your interface may be deaf or hard of hearing. They may also be in noisy or public environments.

Support text-based ways to enjoy audio and video. It’s important that dialogue and crucial information about your app or game isn’t communicated through audio alone. Depending on the context, give people different text-based ways to experience their media, and allow people to customize the visual presentation of that text:

Captions give people the textual equivalent of audible information in video or audio-only content. Captions are great for scenarios like game cutscenes and video clips where text synchronizes live with the media.

Subtitles allow people to read live onscreen dialogue in their preferred language. Subtitles are great for TV shows and movies.

Audio descriptions are interspersed between natural pauses in the main audio of a video and supply spoken narration of important information that’s presented only visually.

Transcripts provide a complete textual description of a video, covering both audible and visual information. Transcripts are great for longer-form media like podcasts and audiobooks where people may want to review content as a whole or highlight the transcript as media is playing.

For developer guidance, see Selecting subtitles and alternative audio tracks.

Use haptics in addition to audio cues. If your interface conveys information through audio cues — such as a success chime, error sound, or game feedback — consider pairing that sound with matching haptics for people who can’t perceive the audio or have their audio turned off. In iOS and iPadOS, you can also use Music Haptics and Audio graphs to let people experience music and infographics through vibration and texture. For guidance, see Playing haptics.

An illustration of an iPhone device vibrating as music plays from the device.

Augment audio cues with visual cues. This is especially important for games and spatial apps where important content might be taking place off screen. When using audio to guide people towards a specific action, also add in visual indicators that point to where you want people to interact.

Mobility
An illustration containing five symbols associated with the topic of mobility, including symbols representing the keyboard, movement, and touch.

Ensure your interface offers a comfortable experience for people with limited dexterity or mobility.

Offer sufficiently sized controls. Controls that are too small are hard for many people to interact with and select. Strive to meet the recommended minimum control size for each platform to ensure controls and menus are comfortable for all when tapping and clicking.

Platform

Default control size

Minimum control size

iOS, iPadOS

44x44 pt

28x28 pt

macOS

28x28 pt

20x20 pt

tvOS

66x66 pt

56x56 pt

visionOS

60x60 pt

28x28 pt

watchOS

44x44 pt

28x28 pt

Consider spacing between controls as important as size. Include enough padding between elements to reduce the chance that someone taps the wrong control. In general, it works well to add about 12 points of padding around elements that include a bezel. For elements without a bezel, about 24 points of padding works well around the element’s visible edges.

An illustration showing three buttons: rewind, play, and fast forward. The buttons have insufficient padding between them.
Elements with insufficient padding

An X in a circle to indicate incorrect usage.

An illustration showing three buttons: rewind, play, and fast forward. The buttons are spaced apart, with sufficient padding between them.
Elements with sufficient padding

A checkmark in a circle to indicate correct usage.

Support simple gestures for common interactions. For many people, with or without disabilities, complex gestures can be challenging. For interactions people do frequently in your app or game, use the simplest gesture possible — avoid custom multifinger and multihand gestures — so repetitive actions are both comfortable and easy to remember.

Offer alternatives to gestures. Make sure your UI’s core functionality is accessible through more than one type of physical interaction. Gestures can be less comfortable for people who have limited dexterity, so offer onscreen ways to achieve the same outcome. For example, if you use a swipe gesture to dismiss a view, also make a button available so people can tap or use an assistive device.

An illustration of a table view in edit mode. The rows of the table include delete buttons.
Edit and tap to delete

An illustration of a table view. One of the rows in the table is swiped to the left to reveal a delete button.
Swipe to delete

Let people use Voice Control to give guidance and enter information verbally. With Voice Control, people can interact with their devices entirely by speaking commands. They can perform gestures, interact with screen elements, dictate and edit text, and more. To ensure a smooth experience, label interface elements appropriately. For developer guidance, see Voice Control.

Integrate with Siri and Shortcuts to let people perform tasks using voice alone. When your app supports Siri and Shortcuts, people can automate the important and repetitive tasks they perform regularly. They can initiate these tasks from Siri, the Action button on their iPhone or Apple Watch, and shortcuts on their Home Screen or in Control Center. For guidance, see Siri.

Support mobility-related assistive technologies. Features like VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control, and Switch Control offer alternative ways for people with low mobility to interact with their devices. Conduct testing and verify that your app or game supports these technologies, and that your interface elements are appropriately labeled to ensure a great experience. For more information, see Performing accessibility testing for your app.

Speech
An illustration containing five symbols associated with the topic of speech, including symbols representing waveforms and speech.

Apple’s accessibility features help people with speech disabilities and people who prefer text-based interactions to communicate effectively using their devices.

Let people use the keyboard alone to navigate and interact with your app. People can turn on Full Keyboard Access to navigate apps using their physical keyboard. The system also defines accessibility keyboard shortcuts and a wide range of other keyboard shortcuts that many people use all the time. Avoid overriding system-defined keyboard shortcuts and evaluate your app to ensure it works well with Full Keyboard Access. For additional guidance, see Keyboards. For developer guidance, see Support Full Keyboard Access in your iOS app.

Support Switch Control. Switch Control is an assistive technology that lets people control their devices through separate hardware, game controllers, or sounds such as a click or a pop. People can perform actions like selecting, tapping, typing, and drawing when your app or game supports the ability to navigate using Switch Control. For developer guidance, see Switch Control.

Cognitive
An illustration containing five symbols associated with the topic of cognition, including symbols representing music, security, and information hierarchy.

When you minimize complexity in your app or game, all people benefit.

Keep actions simple and intuitive. Ensure that people can navigate your interface using easy-to-remember and consistent interactions. Prefer system gestures and behaviors people are already familiar with over creating custom gestures people must learn and retain.

Minimize use of time-boxed interface elements. Views and controls that auto-dismiss on a timer can be problematic for people who need longer to process information, and for people who use assistive technologies that require more time to traverse the interface. Prefer dismissing views with an explicit action.

Consider offering difficulty accommodations in games. Everyone has their own way of playing and enjoying games. To support a variety of cognitive abilities, consider adding the ability to customize the difficulty level of your game, such as offering options for people to reduce the criteria for successfully completing a level, adjust reaction time, or enable control assistance.

Let people control audio and video playback. Avoid autoplaying audio and video content without also providing controls to start and stop it. Make sure these controls are discoverable and easy to act upon, and consider global settings that let people opt out of auto-playing all audio and video. For developer guidance, see Animated images and isVideoAutoplayEnabled.

Allow people to opt out of flashing lights in video playback. People might want to avoid bright, frequent flashes of light in the media they consume. A Dim Flashing Lights setting allows the system to calculate, mitigate, and inform people about flashing lights in a piece of media. If your app supports video playback, ensure that it responds appropriately to the Dim Flashing Lights setting. For developer guidance, see Flashing lights.

Be cautious with fast-moving and blinking animations. When you use these effects in excess, it can be distracting, cause dizziness, and in some cases even result in epileptic episodes. People who are prone to these effects can turn on the Reduce Motion accessibility setting. When this setting is active, ensure your app or game responds by reducing automatic and repetitive animations, including zooming, scaling, and peripheral motion. Other best practices for reducing motion include:

Tightening animation springs to reduce bounce effects

Tracking animations directly with people’s gestures

Avoiding animating depth changes in z-axis layers

Replacing transitions in x-, y-, and z-axes with fades to avoid motion

Avoiding animating into and out of blurs

Optimize your app’s UI for Assistive Access. Assistive Access is an accessibility feature in iOS and iPadOS that allows people with cognitive disabilities to use a streamlined version of your app. Assistive Access sets a default layout and control presentation for apps that reduces cognitive load, such as the following layout of the Camera app.

A screenshot of the Camera app in Assistive Access, showing an interface with three large buttons: Photo, Video, and Back.

A screenshot of the Camera app open to the photo screen in Assistive Access, showing an interface with two large buttons: Take Photo and Back.

To optimize your app for this mode, use the following guidelines when Assistive Access is turned on:

Identify the core functionality of your app and consider removing noncritical workflows and UI elements.

Break up multistep workflows so people can focus on a single interaction per screen.

Always ask for confirmation twice whenever people perform an action that’s difficult to recover from, such a deleting a file.

For developer guidance, see Assistive Access.

Platform considerations
No additional considerations for iOS, iPadOS, macOS, tvOS, or watchOS.

visionOS
visionOS offers a variety of accessibility features people can use to interact with their surroundings in ways that are comfortable and work best for them, including head and hand Pointer Control, and a Zoom feature.

Pointer Control (hand)
Pointer Control (head)
Zoom
Play
Prioritize comfort. The immersive nature of visionOS means that interfaces, animations, and interactions have a greater chance of causing motion sickness, and visual and ergonomic discomfort for people. To ensure the most comfortable experience, consider these tips:

Keep interface elements within a person’s field of view. Prefer horizontal layouts to vertical ones that might cause neck strain, and avoid demanding the viewer’s attention in different locations in quick succession.

Reduce the speed and intensity of animated objects, particularly in someone’s peripheral vision.

Be gentle with camera and video motion, and avoid situations where someone may feel like the world around them is moving without their control.

Avoid anchoring content to the wearer’s head, which may make them feel stuck and confined, and also prevent them from using assistive technologies like Pointer Control.

Minimize the need for large and repetitive gestures, as these can become tiresome and may be difficult depending on a person’s surroundings.

For additional guidance, see Create accessible spatial experiences and Design considerations for vision and motion.

Resources
Related
Inclusion

Typography

VoiceOver

Developer documentation
Building accessible apps

Accessibility framework

Overview of Accessibility Nutrition Labels



Branding
Apps and games express their unique brand identity in ways that make them instantly recognizable while feeling at home on the platform and giving people a consistent experience.
A sketch of a megaphone, suggesting communication. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

In addition to expressing your brand in your app icon and throughout your experience, you have several opportunities to highlight it within the App Store. For guidance, see App Store Marketing Guidelines.

Best practices
Use your brand’s unique voice and tone in all the written communication you display. For example, your brand might convey feelings of encouragement and optimism by using plain words, occasional exclamation marks and emoji, and simple sentence structures.

Consider choosing an accent color. On most platforms, you can specify a color that the system applies to app elements like interface icons, buttons, and text. In macOS, people can also choose their own accent color that the system can use in place of the color an app specifies. For guidance, see Color.

Consider using a custom font. If your brand is strongly associated with a specific font, be sure that it’s legible at all sizes and supports accessibility features like bold text and larger type. It can work well to use a custom font for headlines and subheadings while using a system font for body copy and captions, because the system fonts are designed for optimal legibility at small sizes. For guidance, see Typography.

Ensure branding always defers to content. Using screen space for an element that does nothing but display a brand asset can mean there’s less room for the content people care about. Aim to incorporate branding in refined, unobtrusive ways that don’t distract people from your experience.

Help people feel comfortable by using standard patterns consistently. Even a highly stylized interface can be approachable if it maintains familiar behaviors. For example, place UI components in expected locations and use standard symbols to represent common actions.

Resist the temptation to display your logo throughout your app or game unless it’s essential for providing context. People seldom need to be reminded which app they’re using, and it’s usually better to use the space to give people valuable information and controls.

Avoid using a launch screen as a branding opportunity. Some platforms use a launch screen to minimize the startup experience, while simultaneously giving the app or game a little time to load resources (for guidance, see Launch screens). A launch screen disappears too quickly to convey any information, but you might consider displaying a welcome or onboarding screen that incorporates your branding content at the beginning of your experience. For guidance, see Onboarding.

Follow Apple’s trademark guidelines. Apple trademarks must not appear in your app name or images. See Apple Trademark List and Guidelines for Using Apple Trademarks.

Platform considerations
No additional considerations for iOS, iPadOS, macOS, tvOS, visionOS, or watchOS.

Resources
Related
Marketing resources and identity guidelines

Show more with app previews

Color


Color
Judicious use of color can enhance communication, evoke your brand, provide visual continuity, communicate status and feedback, and help people understand information.
A sketch of a paint palette, suggesting the use of color. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

The system defines colors that look good on various backgrounds and appearance modes, and can automatically adapt to vibrancy and accessibility settings. Using system colors is a convenient way to make your experience feel at home on the device.

You may also want to use custom colors to enhance the visual experience of your app or game and express its unique personality. The following guidelines can help you use color in ways that people appreciate, regardless of whether you use system-defined or custom colors.

Best practices
Avoid using the same color to mean different things. Use color consistently throughout your interface, especially when you use it to help communicate information like status or interactivity. For example, if you use your brand color to indicate that a borderless button is interactive, using the same or similar color to stylize noninteractive text is confusing.

Make sure all your app’s colors work well in light, dark, and increased contrast contexts. iOS, iPadOS, macOS, and tvOS offer both light and dark appearance settings. System colors vary subtly depending on the system appearance, adjusting to ensure proper color differentiation and contrast for text, symbols, and other elements. With the Increase Contrast setting turned on, the color differences become far more apparent. When possible, use system colors, which already define variants for all these contexts. If you define a custom color, make sure to supply light and dark variants, and an increased contrast option for each variant that provides a significantly higher amount of visual differentiation. Even if your app ships in a single appearance mode, provide both light and dark colors to support Liquid Glass adaptivity in these contexts.

A screenshot of the Notes app in iOS with the light system appearance and default contrast. The Notes app is open to a note with the text 'Note'. The text is selected, which shows a yellow selection highlight and text editing menu. The Done button appears in the upper-right corner. The Liquid Glass background of the button is yellow, and its label, which shows a checkmark, is white. The shade of yellow is vibrant.
Default (light)

A screenshot of the Notes app in iOS with the light system appearance and increased contrast. The Notes app is open to a note with the text 'Note'. The text is selected, which shows a yellow selection highlight and text editing menu. The Done button appears in the upper-right corner. The Liquid Glass background of the button is yellow, and its label, which shows a checkmark, is black. The shade of yellow is darker to provide more contrast and differentiation against the note's white background.
Increased contrast (light)

A screenshot of the Notes app in iOS with the dark system appearance and default contrast. The Notes app is open to a note with the text 'Note'. The text is selected, which shows a yellow selection highlight and text editing menu. The Done button appears in the upper-right corner. The Liquid Glass background of the button is yellow, and its label, which shows a checkmark, is white.
Default (dark)

A screenshot of the Notes app in iOS with the dark system appearance and increased contrast. The Notes app is open to a note with the text 'Note'. The text is selected, which shows a yellow selection highlight and text editing menu. The Done button appears in the upper-right corner. The Liquid Glass background of the button is yellow, and its label, which shows a checkmark, is black.
Increased contrast (dark)

Test your app’s color scheme under a variety of lighting conditions. Colors can look different when you view your app outside on a sunny day or in dim light. In bright surroundings, colors look darker and more muted. In dark environments, colors appear bright and saturated. In visionOS, colors can look different depending on the colors of a wall or object in a person’s physical surroundings and how it reflects light. Adjust app colors to provide an optimal viewing experience in the majority of use cases.

Test your app on different devices. For example, the True Tone display — available on certain iPhone, iPad, and Mac models — uses ambient light sensors to automatically adjust the white point of the display to adapt to the lighting conditions of the current environment. Apps that primarily support reading, photos, video, and gaming can strengthen or weaken this effect by specifying a white point adaptivity style (for developer guidance, see UIWhitePointAdaptivityStyle). Test tvOS apps on multiple brands of HD and 4K TVs, and with different display settings. You can also test the appearance of your app using different color profiles on a Mac — such as P3 and Standard RGB (sRGB) — by choosing a profile in System Settings > Displays. For guidance, see Color management.

Consider how artwork and translucency affect nearby colors. Variations in artwork sometimes warrant changes to nearby colors to maintain visual continuity and prevent interface elements from becoming overpowering or underwhelming. Maps, for example, displays a light color scheme when in map mode but switches to a dark color scheme when in satellite mode. Colors can also appear different when placed behind or applied to a translucent element like a toolbar.

If your app lets people choose colors, prefer system-provided color controls where available. Using built-in color pickers provides a consistent user experience, in addition to letting people save a set of colors they can access from any app. For developer guidance, see ColorPicker.

Inclusive color
Avoid relying solely on color to differentiate between objects, indicate interactivity, or communicate essential information. When you use color to convey information, be sure to provide the same information in alternative ways so people with color blindness or other visual disabilities can understand it. For example, you can use text labels or glyph shapes to identify objects or states.

Avoid using colors that make it hard to perceive content in your app. For example, insufficient contrast can cause icons and text to blend with the background and make content hard to read, and people who are color blind might not be able to distinguish some color combinations. For guidance, see Accessibility.

Consider how the colors you use might be perceived in other countries and cultures. For example, red communicates danger in some cultures, but has positive connotations in other cultures. Make sure the colors in your app send the message you intend.

An illustration of an upward-trending stock chart in the Stocks app in English. The line of the graph is green to indicate the rising value of the stock during the selected time period.
Green indicates a positive trend in the Stocks app in English.

An illustration of an upward-trending stock chart in the Stocks app in Chinese. The line of the graph is red to indicate the rising value of the stock during the selected time period.
Red indicates a positive trend in the Stocks app in Chinese.

System colors
Avoid hard-coding system color values in your app. Documented color values are for your reference during the app design process. The actual color values may fluctuate from release to release, based on a variety of environmental variables. Use APIs like Color to apply system colors.

iOS, iPadOS, macOS, and visionOS also define sets of dynamic system colors that match the color schemes of standard UI components and automatically adapt to both light and dark contexts. Each dynamic color is semantically defined by its purpose, rather than its appearance or color values. For example, some colors represent view backgrounds at different levels of hierarchy and other colors represent foreground content, such as labels, links, and separators.

Avoid redefining the semantic meanings of dynamic system colors. To ensure a consistent experience and ensure your interface looks great when the appearance of the platform changes, use dynamic system colors as intended. For example, don’t use the separator color as a text color, or secondary text label color as a background color.

Liquid Glass color
By default, Liquid Glass has no inherent color, and instead takes on colors from the content directly behind it. You can apply color to some Liquid Glass elements, giving them the appearance of colored or stained glass. This is useful for drawing emphasis to a specific control, like a primary call to action, and is the approach the system uses for prominent button styling. Symbols or text labels on Liquid Glass controls can also have color.

A screenshot of the Done button in iOS, which appears as a checkmark on a blue Liquid Glass background.
Controls can use color in the Liquid Glass background, like in a primary action button.

A screenshot of a tab bar in iOS, with the first tab selected. The symbol and text label of the selected tab bar item are blue.
Symbols and text that appear on Liquid Glass can have color, like in a selected tab bar item.

A screenshot of the Share button in iOS over a colorful image. The colors from the background image infuse the Liquid Glass in the button, affecting its color.
By default, Liquid Glass picks up the color from the content layer behind it.

For smaller elements like toolbars and tab bars, the system can adapt Liquid Glass between a light and dark appearance in response to the underlying content. By default, symbols and text on these elements follow a monochromatic color scheme, becoming darker when the underlying content is light, and lighter when it’s dark. Liquid Glass appears more opaque in larger elements like sidebars to preserve legibility over complex backgrounds and accommodate richer content on the material’s surface.

Apply color sparingly to the Liquid Glass material, and to symbols or text on the material. If you apply color, reserve it for elements that truly benefit from emphasis, such as status indicators or primary actions. To emphasize primary actions, apply color to the background rather than to symbols or text. For example, the system applies the app accent color to the background in prominent buttons — such as the Done button — to draw attention and elevate their visual prominence. Refrain from adding color to the background of multiple controls.

A screenshot of the top half of an iPhone app that shows a toolbar with several buttons. All of the buttons in the toolbar use a blue accent color for their Liquid Glass background.

An X in a circle to indicate incorrect usage.

A screenshot of the top half of an iPhone app that shows a toolbar with several buttons. Only the Done button in the toolbar uses a blue accent color for its Liquid Glass background.

A checkmark in a circle to indicate correct usage.

Avoid using similar colors in control labels if your app has a colorful background. While color can make apps more visually appealing, playful, or reflective of your brand, too much color can be overwhelming and make control labels more difficult to read. If your app features colorful backgrounds or visually rich content, prefer a monochromatic appearance for toolbars and tab bars, or choose an accent color with sufficient visual differentiation. By contrast, in apps with primarily monochromatic content or backgrounds, choosing your brand color as the app accent color can be an effective way to tailor your app experience and reflect your company’s identity.

Be aware of the placement of color in the content layer. Make sure your interface maintains sufficient contrast by avoiding overlap of similar colors in the content layer and controls when possible. Although colorful content might intermittently scroll underneath controls, make sure its default or resting state — like the top of a screen of scrollable content — maintains clear legibility.

Color management
A color space represents the colors in a color model like RGB or CMYK. Common color spaces — sometimes called gamuts — are sRGB and Display P3.

Diagram showing the colors included in the sRGB space, compared to the larger number of colors included in the P3 color space.

A color profile describes the colors in a color space using, for example, mathematical formulas or tables of data that map colors to numerical representations. An image embeds its color profile so that a device can interpret the image’s colors correctly and reproduce them on a display.

Apply color profiles to your images. Color profiles help ensure that your app’s colors appear as intended on different displays. The sRGB color space produces accurate colors on most displays.

Use wide color to enhance the visual experience on compatible displays. Wide color displays support a P3 color space, which can produce richer, more saturated colors than sRGB. As a result, photos and videos that use wide color are more lifelike, and visual data and status indicators that use wide color can be more meaningful. When appropriate, use the Display P3 color profile at 16 bits per pixel (per channel) and export images in PNG format. Note that you need to use a wide color display to design wide color images and select P3 colors.

Provide color space–specific image and color variations if necessary. In general, P3 colors and images appear fine on sRGB displays. Occasionally, it may be hard to distinguish two very similar P3 colors when viewing them on an sRGB display. Gradients that use P3 colors can also sometimes appear clipped on sRGB displays. To avoid these issues and to ensure visual fidelity on both wide color and sRGB displays, you can use the asset catalog of your Xcode project to provide different versions of images and colors for each color space.

Platform considerations
iOS, iPadOS
iOS defines two sets of dynamic background colors — system and grouped — each of which contains primary, secondary, and tertiary variants that help you convey a hierarchy of information. In general, use the grouped background colors (systemGroupedBackground, secondarySystemGroupedBackground, and tertiarySystemGroupedBackground) when you have a grouped table view; otherwise, use the system set of background colors (systemBackground, secondarySystemBackground, and tertiarySystemBackground).

With both sets of background colors, you generally use the variants to indicate hierarchy in the following ways:

Primary for the overall view

Secondary for grouping content or elements within the overall view

Tertiary for grouping content or elements within secondary elements

For foreground content, iOS defines the following dynamic colors:

Color

Use for…

UIKit API

Label

A text label that contains primary content.

label

Secondary label

A text label that contains secondary content.

secondaryLabel

Tertiary label

A text label that contains tertiary content.

tertiaryLabel

Quaternary label

A text label that contains quaternary content.

quaternaryLabel

Placeholder text

Placeholder text in controls or text views.

placeholderText

Separator

A separator that allows some underlying content to be visible.

separator

Opaque separator

A separator that doesn’t allow any underlying content to be visible.

opaqueSeparator

Link

Text that functions as a link.

link

macOS
macOS defines the following dynamic system colors (you can also view them in the Developer palette of the standard Color panel):

Color

Use for…

AppKit API

Alternate selected control text color

The text on a selected surface in a list or table.

alternateSelectedControlTextColor

Alternating content background colors

The backgrounds of alternating rows or columns in a list, table, or collection view.

alternatingContentBackgroundColors

Control accent

The accent color people select in System Settings.

controlAccentColor

Control background color

The background of a large interface element, such as a browser or table.

controlBackgroundColor

Control color

The surface of a control.

controlColor

Control text color

The text of a control that is available.

controlTextColor

Current control tint

The system-defined control tint.

currentControlTint

Unavailable control text color

The text of a control that’s unavailable.

disabledControlTextColor

Find highlight color

The color of a find indicator.

findHighlightColor

Grid color

The gridlines of an interface element, such as a table.

gridColor

Header text color

The text of a header cell in a table.

headerTextColor

Highlight color

The virtual light source onscreen.

highlightColor

Keyboard focus indicator color

The ring that appears around the currently focused control when using the keyboard for interface navigation.

keyboardFocusIndicatorColor

Label color

The text of a label containing primary content.

labelColor

Link color

A link to other content.

linkColor

Placeholder text color

A placeholder string in a control or text view.

placeholderTextColor

Quaternary label color

The text of a label of lesser importance than a tertiary label, such as watermark text.

quaternaryLabelColor

Secondary label color

The text of a label of lesser importance than a primary label, such as a label used to represent a subheading or additional information.

secondaryLabelColor

Selected content background color

The background for selected content in a key window or view.

selectedContentBackgroundColor

Selected control color

The surface of a selected control.

selectedControlColor

Selected control text color

The text of a selected control.

selectedControlTextColor

Selected menu item text color

The text of a selected menu.

selectedMenuItemTextColor

Selected text background color

The background of selected text.

selectedTextBackgroundColor

Selected text color

The color for selected text.

selectedTextColor

Separator color

A separator between different sections of content.

separatorColor

Shadow color

The virtual shadow cast by a raised object onscreen.

shadowColor

Tertiary label color

The text of a label of lesser importance than a secondary label.

tertiaryLabelColor

Text background color

The background color behind text.

textBackgroundColor

Text color

The text in a document.

textColor

Under page background color

The background behind a document’s content.

underPageBackgroundColor

Unemphasized selected content background color

The selected content in a non-key window or view.

unemphasizedSelectedContentBackgroundColor

Unemphasized selected text background color

A background for selected text in a non-key window or view.

unemphasizedSelectedTextBackgroundColor

Unemphasized selected text color

Selected text in a non-key window or view.

unemphasizedSelectedTextColor

Window background color

The background of a window.

windowBackgroundColor

Window frame text color

The text in the window’s title bar area.

windowFrameTextColor

App accent colors
Beginning in macOS 11, you can specify an accent color to customize the appearance of your app’s buttons, selection highlighting, and sidebar icons. The system applies your accent color when the current value in General > Accent color settings is multicolor.

A screenshot of the accent color picker in the System Settings app.

If people set their accent color setting to a value other than multicolor, the system applies their chosen color to the relevant items throughout your app, replacing your accent color. The exception is a sidebar icon that uses a fixed color you specify. Because a fixed-color sidebar icon uses a specific color to provide meaning, the system doesn’t override its color when people change the value of accent color settings. For guidance, see Sidebars.

tvOS
Consider choosing a limited color palette that coordinates with your app logo. Subtle use of color can help you communicate your brand while deferring to the content.

Avoid using only color to indicate focus. Subtle scaling and responsive animation are the primary ways to denote interactivity when an element is in focus.

visionOS
Use color sparingly, especially on glass. Standard visionOS windows typically use the system-defined glass material, which lets light and objects from people’s physical surroundings and their space show through. Because the colors in these physical and virtual objects are visible through the glass, they can affect the legibility of colorful app content in the window. Prefer using color in places where it can help call attention to important information or show the relationship between parts of the interface.

Prefer using color in bold text and large areas. Color in lightweight text or small areas can make them harder to see and understand.

In a fully immersive experience, help people maintain visual comfort by keeping brightness levels balanced. Although using high contrast can help direct people’s attention to important content, it can also cause visual discomfort if people’s eyes have adjusted to low light or darkness. Consider making content fully bright only when the rest of the visual context is also bright. For example, avoid displaying a bright object on a very dark or black background, especially if the object flashes or moves.

watchOS
Use background color to support existing content or supply additional information. Background color can establish a sense of place and help people recognize key content. For example, in Activity, each infographic view for the Move, Exercise, and Stand Activity rings has a background that matches the color of the ring. Use background color when you have something to communicate, rather than as a solely visual flourish. Avoid using full-screen background color in views that are likely to remain onscreen for long periods of time, such as in a workout or audio-playing app.

Recognize that people might prefer graphic complications to use tinted mode instead of full color. The system can use a single color that’s based on the wearer’s selected color in a graphic complication’s images, gauges, and text. For guidance, see Complications.

Specifications
System colors
Name

SwiftUI API

Default (light)

Default (dark)

Increased contrast (light)

Increased contrast (dark)

Red

red

R-255,G-56,B-60

R-255,G-66,B-69

R-233,G-21,B-45

R-255,G-97,B-101

Orange

orange

R-255,G-141,B-40

R-255,G-146,B-48

R-197,G-83,B-0

R-255,G-160,B-86

Yellow

yellow

R-255,G-204,B-0

R-255,G-214,B-0

R-161,G-106,B-0

R-254,G-223,B-67

Green

green

R-52,G-199,B-89

R-48,G-209,B-88

R-0,G-137,B-50

R-74,G-217,B-104

Mint

mint

R-0,G-200,B-179

R-0,G-218,B-195

R-0,G-133,B-117

R-84,G-223,B-203

Teal

teal

R-0,G-195,B-208

R-0,G-210,B-224

R-0,G-129,B-152

R-59,G-221,B-236

Cyan

cyan

R-0,G-192,B-232

R-60,G-211,B-254

R-0,G-126,B-174

R-109,G-217,B-255

Blue

blue

R-0,G-136,B-255

R-0,G-145,B-255

R-30,G-110,B-244

R-92,G-184,B-255

Indigo

indigo

R-97,G-85,B-245

R-109,G-124,B-255

R-86,G-74,B-222

R-167,G-170,B-255

Purple

purple

R-203,G-48,B-224

R-219,G-52,B-242

R-176,G-47,B-194

R-234,G-141,B-255

Pink

pink

R-255,G-45,B-85

R-255,G-55,B-95

R-231,G-18,B-77

R-255,G-138,B-196

Brown

brown

R-172,G-127,B-94

R-183,G-138,B-102

R-149,G-109,B-81

R-219,G-166,B-121

visionOS system colors use the default dark color values.

iOS, iPadOS system gray colors
Name

UIKit API

Default (light)

Default (dark)

Increased contrast (light)

Increased contrast (dark)

Gray

systemGray

R-142,G-142,B-147

R-142,G-142,B-147

R-108,G-108,B-112

R-174,G-174,B-178

Gray (2)

systemGray2

R-174,G-174,B-178

R-99,G-99,B-102

R-142,G-142,B-147

R-124,G-124,B-128

Gray (3)

systemGray3

R-199,G-199,B-204

R-72,G-72,B-74

R-174,G-174,B-178

R-84,G-84,B-86

Gray (4)

systemGray4

R-209,G-209,B-214

R-58,G-58,B-60

R-188,G-188,B-192

R-68,G-68,B-70

Gray (5)

systemGray5

R-229,G-229,B-234

R-44,G-44,B-46

R-216,G-216,B-220

R-54,G-54,B-56

Gray (6)

systemGray6

R-242,G-242,B-247

R-28,G-28,B-30

R-235,G-235,B-240

R-36,G-36,B-38

In SwiftUI, the equivalent of systemGray is gray.

Resources
Related
Dark Mode

Accessibility

Materials

Apple Design Resources

Developer documentation
Color — SwiftUI

UIColor — UIKit

Color — AppKit


Images
To make sure your artwork looks great on all devices you support, learn how the system displays content and how to deliver art at the appropriate scale factors.
A sketch of a photo, suggesting imagery. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

Resolution
Different devices can display images at different resolutions. For example, a 2D device displays images according to the resolution of its screen.

A point is an abstract unit of measurement that helps visual content remain consistent regardless of how it’s displayed. In 2D platforms, a point maps to a number of pixels that can vary according to the resolution of the display; in visionOS, a point is an angular value that allows visual content to scale according to its distance from the viewer.

When creating bitmap images, you specify a scale factor which determines the resolution of an image. You can visualize scale factor by considering the density of pixels per point in 2D displays of various resolutions. For example, a scale factor of 1 (also called @1x) describes a 1:1 pixel density, where one pixel is equal to one point. High-resolution 2D displays have higher pixel densities, such as 2:1 or 3:1. A 2:1 density (called @2x) has a scale factor of 2, and a 3:1 density (called @3x) has a scale factor of 3. Because of higher pixel densities, high-resolution displays demand images with more pixels.

Image of a circle that's in standard resolution at scale factor of @1x, and is 10 by 10 pixels.
1x (10x10 px)

Image of a circle that's in high resolution at a scale factor of @2x, and is 20 by 20 pixels.
2x (20x20 px)

Image of a circle that's in high resolution at a scale factor of @3x, and is 30 by 30 pixels.
3x (30x30 px)

Provide high-resolution assets for all bitmap images in your app, for every device you support. As you add each image to your project’s asset catalog, identify its scale factor by appending “@1x,” “@2x,” or “@3x” to its filename. Use the following values for guidance; for additional scale factors, see Layout.

Platform

Scale factors

iPadOS, watchOS

@2x

iOS

@2x and @3x

visionOS

@2x or higher (see visionOS)

macOS, tvOS

@1x and @2x

In general, design images at the lowest resolution and scale them up to create high-resolution assets. When you use resizable vectorized shapes, you might want to position control points at whole values so that they’re cleanly aligned at 1x. This positioning allows the points to remain cleanly aligned to the raster grid at higher resolutions, because 2x and 3x are multiples of 1x.

Formats
As you create different types of images, consider the following recommendations.

Image type

Format

Bitmap or raster work

De-interlaced PNG files

PNG graphics that don’t require full 24-bit color

An 8-bit color palette

Photos

JPEG files, optimized as necessary, or HEIC files

Stereo or spatial photos

Stereo HEIC

Flat icons, interface icons, and other flat artwork that requires high-resolution scaling

PDF or SVG files

Best practices
Include a color profile with each image. Color profiles help ensure that your app’s colors appear as intended on different displays. For guidance, see Color management.

Always test images on a range of actual devices. An image that looks great at design time may appear pixelated, stretched, or compressed when viewed on various devices.

Platform considerations
No additional considerations for iOS, iPadOS, or macOS.

tvOS
Layered images are at the heart of the Apple TV user experience. The system combines layered images, transparency, scaling, and motion to produce a sense of realism and vigor that evokes a personal connection as people interact with onscreen content.

Parallax effect
Parallax is a subtle visual effect the system uses to convey depth and dynamism when an element is in focus. As an element comes into focus, the system elevates it to the foreground, gently swaying it while applying illumination that makes the element’s surface appear to shine. After a period of inactivity, out-of-focus content dims and the focused element expands.

Layered images are required to support the parallax effect.

Play
Layered images
A layered image consists of two to five distinct layers that come together to form a single image. The separation between layers, along with use of transparency, creates a feeling of depth. As someone interacts with an image, layers closer to the surface elevate and scale, overlapping lower layers farther back and producing a 3D effect.

Important

Your tvOS app icon must use a layered image. For other focusable images in your app, including Top Shelf images, layered images are strongly encouraged, but optional.

You can embed layered images in your app or retrieve them from a content server at runtime. For guidance on adding layered images to your app, see the Parallax Previewer User Guide.

Developer note

If your app retrieves layered images from a content server at runtime, you must provide runtime layered images (.lcr). You can generate them from LSR files or Photoshop files using the layerutil command-line tool that Xcode provides. Runtime layered images are intended to be downloaded — don’t embed them in your app.

Use standard interface elements to display layered images. If you use standard views and system-provided focus APIs — such as FocusState — layered images automatically get the parallax treatment when people bring them into focus.

Identify logical foreground, middle, and background elements. In foreground layers, display prominent elements like a character in a game, or text on an album cover or movie poster. Middle layers are perfect for secondary content and effects like shadows. Background layers are opaque backdrops that showcase the foreground and middle layers without upstaging them.

Generally, keep text in the foreground. Unless you want to obscure text, bring it to the foreground layer for clarity.

Keep the background layer opaque. Using varying levels of opacity to let content shine through higher layers is fine, but your background layer must be opaque — you’ll get an error if it’s not. An opaque background layer ensures your artwork looks great with parallax, drop shadows, and system backgrounds.

Keep layering simple and subtle. Parallax is designed to be almost unnoticeable. Excessive 3D effects can appear unrealistic and jarring. Keep depth simple to bring your content to life and add delight.

Leave a safe zone around the foreground layers of your image. When focused, content on some layers may be cropped as the layered image scales and moves. To ensure that essential content is always visible, keep it within a safe zone. For guidance, see App icons.

Always preview layered images. To ensure your layered images look great on Apple TV, preview them throughout your design process using Xcode, the Parallax Previewer app for macOS, or the Parallax Exporter plug-in for Adobe Photoshop. Pay special attention as scaling and clipping occur, and readjust your images as needed to keep important content safe. After your layered images are final, preview them on an actual TV for the most accurate representation of what people will see. To download Parallax Previewer and Parallax Exporter, see Resources.

visionOS
In visionOS, people can view images at a much larger range of sizes than in any other platform, and the system dynamically scales the image resolution to match the current size. Because you can position images at specific angles within someone’s surroundings, image pixels may not line up 1:1 with screen pixels.

Create a layered app icon. App icons in visionOS are composed of two to three layers that provide the appearance of depth by moving at subtly different rates when the icon is in focus. For guidance, see Layer design.

Prefer vector-based art for 2D images. Avoid bitmap content because it might not look good when the system scales it up. If you use Core Animation layers, see Drawing sharp layer-based content in visionOS for developer guidance.

If you need to use rasterized images, balance quality with performance as you choose a resolution. Although a @2x image looks fine at common viewing distances, its fixed resolution means that the system doesn’t dynamically scale it and it might not look sharp from close up. To help a rasterized image look sharp when people view it from a wide range of distances, you can use a higher resolution, but each increase in resolution results in a larger file size and may impact your app’s runtime performance, especially for resolutions over @6x. If you use images that have resolutions higher than @2x, be sure to also apply high-quality image filtering to help balance quality and performance (for developer guidance, see filters).

Spatial photos and spatial scenes
In addition to 2D and stereoscopic images, visionOS apps and games can use RealityKit to display spatial photos and spatial scenes. A spatial photo is a stereoscopic photo with additional spatial metadata, as captured on iPhone 15 Pro or later, Apple Vision Pro, or other compatible camera. A spatial scene is a 3D image generated from a 2D image to add a parallax effect that responds to head movement. For developer guidance, see ImagePresentationComponent.

Make sure spatial photos render correctly in your app. Use the stereo High-Efficiency Image Codec (HEIC) format to display a spatial photo in your app. When you add spatial metadata to a stereo HEIC, visionOS recognizes the photo as spatial and includes visual treatments that help minimize common causes of stereo-viewing discomfort.

Prefer the feathered glass background effect to display text over spatial photos. If you need to place text over a spatial photo in your app or game, use the feathered glass background effect. The effect adds contrast to make the text readable, and it blurs out detail to help reduce visual discomfort when people view text over spatial photos. For developer guidance, see GlassBackgroundEffect.

Take visual comfort into consideration when you make spatial photos from existing 2D content. When adjusting the spatial metadata of a photo for your app or game, consider how you want people to view your content. Metadata like disparity adjustment can alter how people perceive the 3D scene, and can cause visual discomfort from certain viewing positions. For developer guidance, see Creating spatial photos and videos with spatial metadata.

Display spatial photos and spatial scenes in standalone views. Avoid displaying spatial photos inline with other content, as this can cause visual discomfort. Instead, showcase spatial photos or spatial scenes in a separate view, like a sheet or window. If you must display stereoscopic images inline, provide generous spacing between the image and any inline content to help people’s eyes adjust to the depth changes.

Use spatial scenes in your app for specific moments. Each spatial scene can take up to several seconds to generate from an existing image. Design experiences with this limitation in mind. For instance, the Photos app offers an explicit action to create a spatial scene while immersed in a single photo. Avoid displaying too many spatial scenes at once. Instead, use scroll views, pagination, or explicit actions to move to new photos and keep the visual information hierarchy simple.

When displaying immersively, prefer minimal UI. For example, the Spatial Gallery app displays a single piece of content with a small caption and a single Back button, relying on swipe gestures to navigate between items.

Prefer displaying larger spatial scenes that you center in someone’s field of view. When people view a spatial scene, they may move their head laterally to view the parallax effect. Smaller spatial scenes provide less of a parallax effect and may not be as impactful to viewers.

watchOS
In general, avoid transparency to keep image files small. If you always composite an image on the same solid background color, it’s more efficient to include the background in the image. However, transparency is necessary in complication images, menu icons, and other interface icons that serve as template images, because the system uses it to determine where to apply color.

Use autoscaling PDFs to let you provide a single asset for all screen sizes. Design your image for the 40mm and 42mm screens at 2x. When you load the PDF, WatchKit automatically scales the image based on the device’s screen size, using the values shown below:

Screen size

Image scale

38mm

90%

40mm

100%

41mm

106%

42mm

100%

44mm

110%

45mm

119%

49mm

119%

Resources
Related
Apple Design Resources

Developer documentation
Drawing sharp layer-based content in visionOS — visionOS

Images — SwiftUI

UIImageView — UIKit

NSImageView — AppKit



Layout
A consistent layout that adapts to various contexts makes your experience more approachable and helps people enjoy their favorite apps and games on all their devices.
A sketch of a small rectangle in the upper-left quadrant of a larger rectangle, suggesting the position of a user interface element within a window. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

Your app’s layout helps ground people in your content from the moment they open it. People expect familiar relationships between controls and content to help them use and discover your app’s features, and designing the layout to take advantage of this makes your app feel at home on the platform.

Apple provides templates, guides, and other resources that can help you integrate Apple technologies and design your apps and games to run on all Apple platforms. See Apple Design Resources.

Best practices
Group related items to help people find the information they want. For example, you might use negative space, background shapes, colors, materials, or separator lines to show when elements are related and to separate information into distinct areas. When you do so, ensure that content and controls remain clearly distinct.

Make essential information easy to find by giving it sufficient space. People want to view the most important information right away, so don’t obscure it by crowding it with nonessential details. You can make secondary information available in other parts of the window, or include it in an additional view.

Extend content to fill the screen or window. Make sure backgrounds and full-screen artwork extend to the edges of the display. Also ensure that scrollable layouts continue all the way to the bottom and the sides of the device screen. Controls and navigation components like sidebars and tab bars appear on top of content rather than on the same plane, so it’s important for your layout to take this into account.

When your content doesn’t span the full window, use a background extension view to provide the appearance of content behind the control layer on either side of the screen, such as beneath the sidebar or inspector. For developer guidance, see backgroundExtensionEffect() and UIBackgroundExtensionView.

A screenshot of a full screen iPad app with a sidebar on the leading edge. A photo of Mount Fuji fills the top half of the content area. The photo subtly blurs as it reaches the top of the screen, where toolbar items float above it grouped on the trailing edge. Where the photo meets the sidebar, the image flips, blurs, and extends fully beneath the sidebar to the edge of the screen.

Visual hierarchy
Differentiate controls from content. Take advantage of the Liquid Glass material to provide a distinct appearance for controls that’s consistent across iOS, iPadOS, and macOS. Instead of a background, use a scroll edge effect to provide a transition between content and the control area. For guidance, see Scroll views.

Place items to convey their relative importance. People often start by viewing items in reading order — that is, from top to bottom and from the leading to trailing side — so it generally works well to place the most important items near the top and leading side of the window, display, or field of view. Be aware that reading order varies by language, and take right to left languages into account as you design.

Align components with one another to make them easier to scan and to communicate organization and hierarchy. Alignment makes an app look neat and organized and can help people track content while scrolling or moving their eyes, making it easier to find information. Along with indentation, alignment can also help people understand an information hierarchy.

Take advantage of progressive disclosure to help people discover content that’s currently hidden. For example, if you can’t display all the items in a large collection at once, you need to indicate that there are additional items that aren’t currently visible. Depending on the platform, you might use a disclosure control, or display parts of items to hint that people can reveal additional content by interacting with the view, such as by scrolling.

Make controls easier to use by providing enough space around them and grouping them in logical sections. If unrelated controls are too close together — or if other content crowds them — they can be difficult for people to tell apart or understand what they do, which can make your app or game hard to use. For guidance, see Toolbars.

Adaptability
Every app and game needs to adapt when the device or system context changes. In iOS, iPadOS, tvOS, and visionOS, the system defines a collection of traits that characterize variations in the device environment that can affect the way your app or game looks. Using SwiftUI or Auto Layout can help you ensure that your interface adapts dynamically to these traits and other context changes; if you don’t use these tools, you need to use alternative methods to do the work.

Here are some of the most common device and system variations you need to handle:

Different device screen sizes, resolutions, and color spaces

Different device orientations (portrait/landscape)

System features like Dynamic Island and camera controls

External display support, Display Zoom, and resizable windows on iPad

Dynamic Type text-size changes

Locale-based internationalization features like left-to-right/right-to-left layout direction, date/time/number formatting, font variation, and text length

Design a layout that adapts gracefully to context changes while remaining recognizably consistent. People expect your experience to work well and remain familiar when they rotate their device, resize a window, add another display, or switch to a different device. You can help ensure an adaptable interface by respecting system-defined safe areas, margins, and guides (where available) and specifying layout modifiers to fine-tune the placement of views in your interface.

Be prepared for text-size changes. People appreciate apps and games that respond when they choose a different text size. When you support Dynamic Type — a feature that lets people choose the size of visible text in iOS, iPadOS, tvOS, visionOS, and watchOS — your app or game can respond appropriately when people adjust text size. To support Dynamic Type in your Unity-based game, use Apple’s accessibility plug-in (for developer guidance, see Apple – Accessibility). For guidance on displaying text in your app, see Typography.

Preview your app on multiple devices, using different orientations, localizations, and text sizes. You can streamline the testing process by first testing versions of your experience that use the largest and the smallest layouts. Although it’s generally best to preview features like wide-gamut color on actual devices, you can use Xcode Simulator to check for clipping and other layout issues. For example, if your iOS app or game supports landscape mode, you can use Simulator to make sure your layouts look great whether the device rotates left or right.

When necessary, scale artwork in response to display changes. For example, viewing your app or game in a different context — such as on a screen with a different aspect ratio — might make your artwork appear cropped, letterboxed, or pillarboxed. If this happens, don’t change the aspect ratio of the artwork; instead, scale it so that important visual content remains visible. In visionOS, the system automatically scales a window when it moves along the z-axis.

Guides and safe areas
A layout guide defines a rectangular region that helps you position, align, and space your content on the screen. The system includes predefined layout guides that make it easy to apply standard margins around content and restrict the width of text for optimal readability. You can also define custom layout guides. For developer guidance, see UILayoutGuide and NSLayoutGuide.

A safe area defines the area within a view that isn’t covered by a toolbar, tab bar, or other views a window might provide. Safe areas are essential for avoiding a device’s interactive and display features, like Dynamic Island on iPhone or the camera housing on some Mac models. For developer guidance, see SafeAreaRegions and Positioning content relative to the safe area.

Respect key display and system features in each platform. When an app or game doesn’t accommodate such features, it doesn’t feel at home in the platform and may be harder for people to use. In addition to helping you avoid display and system features, safe areas can also help you account for interactive components like bars, dynamically repositioning content when sizes change.

For templates that include the guides and safe areas for each platform, see Apple Design Resources.

Platform considerations
iOS
Aim to support both portrait and landscape orientations. People appreciate apps and games that work well in different device orientations, but sometimes your experience needs to run in only portrait or only landscape. When this is the case, you can rely on people trying both orientations before settling on the one you support — there’s no need to tell people to rotate their device. If your app or game is landscape-only, make sure it runs equally well whether people rotate their device to the left or the right.

Prefer a full-bleed interface for your game. Give players a beautiful interface that fills the screen while accommodating the corner radius, sensor housing, and features like Dynamic Island. If necessary, consider giving players the option to view your game using a letterboxed or pillarboxed appearance.

Avoid full-width buttons. Buttons feel at home in iOS when they respect system-defined margins and are inset from the edges of the screen. If you need to include a full-width button, make sure it harmonizes with the curvature of the hardware and aligns with adjacent safe areas.

Hide the status bar only when it adds value or enhances your experience. The status bar displays information people find useful and it occupies an area of the screen most apps don’t fully use, so it’s generally a good idea to keep it visible. The exception is if you offer an in-depth experience like playing a game or viewing media, where it might make sense to hide the status bar.

iPadOS
People can freely resize windows down to a minimum width and height, similar to window behavior in macOS. It’s important to account for this resizing behavior and the full range of possible window sizes when designing your layout. For guidance, see Multitasking and Windows.

As someone resizes a window, defer switching to a compact view for as long as possible. Design for a full-screen view first, and only switch to a compact view when a version of the full layout no longer fits. This helps the UI feel more stable and familiar in as many situations as possible. For more complex layouts such as split views, prefer hiding tertiary columns such as inspectors as the view narrows.

Test your layout at common system-provided sizes, and provide smooth transitions. Window controls provide the option to arrange windows to fill halves, thirds, and quadrants of the screen, so it’s important to check your layout at each of these sizes on a variety of devices. Be sure to minimize unexpected UI changes as people adjust down to the minimum and up to the maximum window size.

Consider a convertible tab bar for adaptive navigation. For many apps, you don’t need to choose between a tab bar or sidebar for navigation; instead, you can adopt a style of tab bar that provides both. The app first launches with your choice of a sidebar or a tab bar, and then people can tap to switch between them. As the view resizes, the presentation style changes to fit the width of the view. For guidance, see Tab bars. For developer guidance, see sidebarAdaptable.

macOS
Avoid placing controls or critical information at the bottom of a window. People often move windows so that the bottom edge is below the bottom of the screen.

Avoid displaying content within the camera housing at the top edge of the window. For developer guidance, see NSPrefersDisplaySafeAreaCompatibilityMode.

tvOS
Be prepared for a wide range of TV sizes. On Apple TV, layouts don’t automatically adapt to the size of the screen like they do on iPhone or iPad. Instead, apps and games show the same interface on every display. Take extra care in designing your layout so that it looks great in a variety of screen sizes.

Adhere to the screen’s safe area. Inset primary content 60 points from the top and bottom of the screen, and 80 points from the sides. It can be difficult for people to see content that close to the edges, and unintended cropping can occur due to overscanning on older TVs. Allow only partially displayed offscreen content and elements that deliberately flow offscreen to appear outside this zone.

An illustration of a TV with a safe zone border on all sides. In width, the top and bottom borders measure 60 points, and the side borders both measure 80 points.

Include appropriate padding between focusable elements. When you use UIKit and the focus APIs, an element gets bigger when it comes into focus. Consider how elements look when they’re focused, and make sure you don’t let them overlap important information. For developer guidance, see About focus interactions for Apple TV.

An illustration that uses vertical shaded rectangles to show padding between focusable items.

Grids
The following grid layouts provide an optimal viewing experience. Be sure to use appropriate spacing between unfocused rows and columns to prevent overlap when an item comes into focus.

If you use the UIKit collection view flow element, the number of columns in a grid is automatically determined based on the width and spacing of your content. For developer guidance, see UICollectionViewFlowLayout.

Two-column
Three-column
Four-column
Five-column
Six-column
Seven-column
Eight-column
Nine-column
An illustration of Apple TV, displaying a two-column grid of media items. Additional media items are partially visible on the right side and bottom edge of the screen.

Two-column grid
Attribute

Value

Unfocused content width

860 pt

Horizontal spacing

40 pt

Minimum vertical spacing

100 pt

Include additional vertical spacing for titled rows. If a row has a title, provide enough spacing between the bottom of the previous unfocused row and the center of the title to avoid crowding. Also provide spacing between the bottom of the title and the top of the unfocused items in the row.

Use consistent spacing. When content isn’t consistently spaced, it no longer looks like a grid and it’s harder for people to scan.

Make partially hidden content look symmetrical. To help direct attention to the fully visible content, keep partially hidden offscreen content the same width on each side of the screen.

visionOS
The guidance below can help you lay out content within the windows of your visionOS app or game, making it feel familiar and easy to use. For guidance on displaying windows in space and best practices for using depth, scale, and field of view in your visionOS app, see Spatial layout. To learn more about visionOS window components, see Windows > visionOS.

Note

When you add depth to content in a standard window, the content extends beyond the window’s bounds along the z-axis. If content extends too far along the z-axis, the system clips it.

Consider centering the most important content and controls in your app or game. Often, people can more easily discover and interact with content when it’s near the middle of a window, especially when the window is large.

Keep a window’s content within its bounds. In visionOS, the system displays window controls just outside a window’s bounds in the XY plane. For example, the Share menu appears above the window and the controls for resizing, moving, and closing the window appear below it. Letting 2D or 3D content encroach on these areas can make the system-provided controls, especially those below the window, difficult for people to use.

If you need to display additional controls that don’t belong within a window, use an ornament. An ornament lets you offer app controls that remain visually associated with a window without interfering with the system-provided controls. For example, a window’s toolbar and tab bar appear as ornaments. For guidance, see Ornaments.

Make a window’s interactive components easy for people to look at. You need to include enough space around an interactive component so that visually identifying it is easy and comfortable, and to prevent the system-provided hover effect from obscuring other content. For example, place buttons so their centers are at least 60 points apart. For guidance, see Eyes, Spatial layout, and Buttons > visionOS.

watchOS
Design your content to extend from one edge of the screen to the other. The Apple Watch bezel provides a natural visual padding around your content. To avoid wasting valuable space, consider minimizing the padding between elements.

An illustration of the Workout app’s main list of workouts on Apple Watch. A callout indicates that the currently focused workout item spans the full width of the available screen area.

Avoid placing more than two or three controls side by side in your interface. As a general rule, display no more than three buttons that contain glyphs — or two buttons that contain text — in a row. Although it’s usually better to let text buttons span the full width of the screen, two side-by-side buttons with short text labels can also work well, as long as the screen doesn’t scroll.

A diagram of an Apple Watch screen showing two side-by-side buttons beneath three lines of text.

Support autorotation in views people might want to show others. When people flip their wrist away, apps typically respond to the motion by sleeping the display, but in some cases it makes sense to autorotate the content. For example, a wearer might want to show an image to a friend or display a QR code to a reader. For developer guidance, see isAutorotating.

Specifications
iOS, iPadOS device screen dimensions
Model

Dimensions (portrait)

iPad Pro 12.9-inch

1024x1366 pt (2048x2732 px @2x)

iPad Pro 11-inch

834x1194 pt (1668x2388 px @2x)

iPad Pro 10.5-inch

834x1194 pt (1668x2388 px @2x)

iPad Pro 9.7-inch

768x1024 pt (1536x2048 px @2x)

iPad Air 13-inch

1024x1366 pt (2048x2732 px @2x)

iPad Air 11-inch

820x1180 pt (1640x2360 px @2x)

iPad Air 10.9-inch

820x1180 pt (1640x2360 px @2x)

iPad Air 10.5-inch

834x1112 pt (1668x2224 px @2x)

iPad Air 9.7-inch

768x1024 pt (1536x2048 px @2x)

iPad 11-inch

820x1180 pt (1640x2360 px @2x)

iPad 10.2-inch

810x1080 pt (1620x2160 px @2x)

iPad 9.7-inch

768x1024 pt (1536x2048 px @2x)

iPad mini 8.3-inch

744x1133 pt (1488x2266 px @2x)

iPad mini 7.9-inch

768x1024 pt (1536x2048 px @2x)

iPhone 17 Pro Max

440x956 pt (1320x2868 px @3x)

iPhone 17 Pro

402x874 pt (1206x2622 px @3x)

iPhone Air

420x912 pt (1260x2736 px @3x)

iPhone 17

402x874 pt (1206x2622 px @3x)

iPhone 16 Pro Max

440x956 pt (1320x2868 px @3x)

iPhone 16 Pro

402x874 pt (1206x2622 px @3x)

iPhone 16 Plus

430x932 pt (1290x2796 px @3x)

iPhone 16

393x852 pt (1179x2556 px @3x)

iPhone 16e

390x844 pt (1170x2532 px @3x)

iPhone 15 Pro Max

430x932 pt (1290x2796 px @3x)

iPhone 15 Pro

393x852 pt (1179x2556 px @3x)

iPhone 15 Plus

430x932 pt (1290x2796 px @3x)

iPhone 15

393x852 pt (1179x2556 px @3x)

iPhone 14 Pro Max

430x932 pt (1290x2796 px @3x)

iPhone 14 Pro

393x852 pt (1179x2556 px @3x)

iPhone 14 Plus

428x926 pt (1284x2778 px @3x)

iPhone 14

390x844 pt (1170x2532 px @3x)

iPhone 13 Pro Max

428x926 pt (1284x2778 px @3x)

iPhone 13 Pro

390x844 pt (1170x2532 px @3x)

iPhone 13

390x844 pt (1170x2532 px @3x)

iPhone 13 mini

375x812 pt (1125x2436 px @3x)

iPhone 12 Pro Max

428x926 pt (1284x2778 px @3x)

iPhone 12 Pro

390x844 pt (1170x2532 px @3x)

iPhone 12

390x844 pt (1170x2532 px @3x)

iPhone 12 mini

375x812 pt (1125x2436 px @3x)

iPhone 11 Pro Max

414x896 pt (1242x2688 px @3x)

iPhone 11 Pro

375x812 pt (1125x2436 px @3x)

iPhone 11

414x896 pt (828x1792 px @2x)

iPhone XS Max

414x896 pt (1242x2688 px @3x)

iPhone XS

375x812 pt (1125x2436 px @3x)

iPhone XR

414x896 pt (828x1792 px @2x)

iPhone X

375x812 pt (1125x2436 px @3x)

iPhone 8 Plus

414x736 pt (1080x1920 px @3x)

iPhone 8

375x667 pt (750x1334 px @2x)

iPhone 7 Plus

414x736 pt (1080x1920 px @3x)

iPhone 7

375x667 pt (750x1334 px @2x)

iPhone 6s Plus

414x736 pt (1080x1920 px @3x)

iPhone 6s

375x667 pt (750x1334 px @2x)

iPhone 6 Plus

414x736 pt (1080x1920 px @3x)

iPhone 6

375x667 pt (750x1334 px @2x)

iPhone SE 4.7-inch

375x667 pt (750x1334 px @2x)

iPhone SE 4-inch

320x568 pt (640x1136 px @2x)

iPod touch 5th generation and later

320x568 pt (640x1136 px @2x)

Note

All scale factors in the table above are UIKit scale factors, which may differ from native scale factors. For developer guidance, see scale and nativeScale.

iOS, iPadOS device size classes
A size class is a value that’s either regular or compact, where regular refers to a larger screen or a screen in landscape orientation and compact refers to a smaller screen or a screen in portrait orientation. For developer guidance, see UserInterfaceSizeClass.

Different size class combinations apply to the full-screen experience on different devices, based on screen size.

Model

Portrait orientation

Landscape orientation

iPad Pro 12.9-inch

Regular width, regular height

Regular width, regular height

iPad Pro 11-inch

Regular width, regular height

Regular width, regular height

iPad Pro 10.5-inch

Regular width, regular height

Regular width, regular height

iPad Air 13-inch

Regular width, regular height

Regular width, regular height

iPad Air 11-inch

Regular width, regular height

Regular width, regular height

iPad 11-inch

Regular width, regular height

Regular width, regular height

iPad 9.7-inch

Regular width, regular height

Regular width, regular height

iPad mini 7.9-inch

Regular width, regular height

Regular width, regular height

iPhone 17 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 17 Pro

Compact width, regular height

Compact width, compact height

iPhone Air

Compact width, regular height

Regular width, compact height

iPhone 17

Compact width, regular height

Compact width, compact height

iPhone 16 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 16 Pro

Compact width, regular height

Compact width, compact height

iPhone 16 Plus

Compact width, regular height

Regular width, compact height

iPhone 16

Compact width, regular height

Compact width, compact height

iPhone 16e

Compact width, regular height

Compact width, compact height

iPhone 15 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 15 Pro

Compact width, regular height

Compact width, compact height

iPhone 15 Plus

Compact width, regular height

Regular width, compact height

iPhone 15

Compact width, regular height

Compact width, compact height

iPhone 14 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 14 Pro

Compact width, regular height

Compact width, compact height

iPhone 14 Plus

Compact width, regular height

Regular width, compact height

iPhone 14

Compact width, regular height

Compact width, compact height

iPhone 13 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 13 Pro

Compact width, regular height

Compact width, compact height

iPhone 13

Compact width, regular height

Compact width, compact height

iPhone 13 mini

Compact width, regular height

Compact width, compact height

iPhone 12 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 12 Pro

Compact width, regular height

Compact width, compact height

iPhone 12

Compact width, regular height

Compact width, compact height

iPhone 12 mini

Compact width, regular height

Compact width, compact height

iPhone 11 Pro Max

Compact width, regular height

Regular width, compact height

iPhone 11 Pro

Compact width, regular height

Compact width, compact height

iPhone 11

Compact width, regular height

Regular width, compact height

iPhone XS Max

Compact width, regular height

Regular width, compact height

iPhone XS

Compact width, regular height

Compact width, compact height

iPhone XR

Compact width, regular height

Regular width, compact height

iPhone X

Compact width, regular height

Compact width, compact height

iPhone 8 Plus

Compact width, regular height

Regular width, compact height

iPhone 8

Compact width, regular height

Compact width, compact height

iPhone 7 Plus

Compact width, regular height

Regular width, compact height

iPhone 7

Compact width, regular height

Compact width, compact height

iPhone 6s Plus

Compact width, regular height

Regular width, compact height

iPhone 6s

Compact width, regular height

Compact width, compact height

iPhone SE

Compact width, regular height

Compact width, compact height

iPod touch 5th generation and later

Compact width, regular height

Compact width, compact height

watchOS device screen dimensions
Series

Size

Width (pixels)

Height (pixels)

Apple Watch Ultra (3rd generation)

49mm

422

514

10, 11

42mm

374

446

10, 11

46mm

416

496

Apple Watch Ultra (1st and 2nd generations)

49mm

410

502

7, 8, and 9

41mm

352

430

7, 8, and 9

45mm

396

484

4, 5, 6, and SE (all generations)

40mm

324

394

4, 5, 6, and SE (all generations)

44mm

368

448

1, 2, and 3

38mm

272

340

1, 2, and 3

42mm

312

390

Resources
Related
Right to left

Spatial layout

Layout and organization

Developer documentation
Composing custom layouts with SwiftUI — SwiftUI

Videos

Get to know the new design system

Compose custom layouts with SwiftUI

Essential Design Principles
Change log
Date

Changes

September 9, 2025

Added specifications for iPhone 17, iPhone Air, iPhone 17 Pro, iPhone 17 Pro Max, Apple Watch SE 3, Apple Watch Series 11, and Apple Watch Ultra 3.

June 9, 2025

Added guidance for Liquid Glass.

March 7, 2025

Added specifications for iPhone 16e, iPad 11-inch, iPad Air 11-inch, and iPad Air 13-inch.

September 9, 2024

Added specifications for iPhone 16, iPhone 16 Plus, iPhone 16 Pro, iPhone 16 Pro Max, and Apple Watch Series 10.

June 10, 2024

Made minor corrections and organizational updates.

February 2, 2024

Enhanced guidance for avoiding system controls in iPadOS app layouts, and added specifications for 10.9-inch iPad Air and 8.3-inch iPad mini.

December 5, 2023

Clarified guidance on centering content in a visionOS window.

September 15, 2023

Added specifications for iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, Apple Watch Ultra 2, and Apple Watch SE.

June 21, 2023

Updated to include guidance for visionOS.

September 14, 2022

Added specifications for iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14, and Apple Watch Ultra.



Motion
Beautiful, fluid motions bring the interface to life, conveying status, providing feedback and instruction, and enriching the visual experience of your app or game.
A sketch of three overlapping diamonds, suggesting the movement of an element from left to right. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

Many system components automatically include motion, letting you offer familiar and consistent experiences throughout your app or game. System components might also adjust their motion in response to factors like accessibility settings or different input methods. For example, the movement of Liquid Glass responds to direct touch interaction with greater emphasis to reinforce the feeling of a tactile experience, but produces a more subdued effect when a person interacts using a trackpad.

If you design custom motion, follow the guidelines below.

Best practices
Add motion purposefully, supporting the experience without overshadowing it. Don’t add motion for the sake of adding motion. Gratuitous or excessive animation can distract people and may make them feel disconnected or physically uncomfortable.

Make motion optional. Not everyone can or wants to experience the motion in your app or game, so it’s essential to avoid using it as the only way to communicate important information. To help everyone enjoy your app or game, supplement visual feedback by also using alternatives like haptics and audio to communicate.

Providing feedback
Strive for realistic feedback motion that follows people’s gestures and expectations. In nongame apps, accurate, realistic motion can help people understand how something works, but feedback motion that doesn’t make sense can make them feel disoriented. For example, if someone reveals a view by sliding it down from the top, they don’t expect to dismiss the view by sliding it to the side.

Aim for brevity and precision in feedback animations. When animated feedback is brief and precise, it tends to feel lightweight and unobtrusive, and it can often convey information more effectively than prominent animation. For example, when a game displays a succinct animation that’s precisely tied to a successful action, players can instantly get the message without being distracted from their gameplay. Another example is in visionOS: When people tap a panorama in Photos, it quickly and smoothly expands to fill the space in front of them, helping them track the transition without making them wait to enjoy the content.

In apps, generally avoid adding motion to UI interactions that occur frequently. The system already provides subtle animations for interactions with standard interface elements. For a custom element, you generally want to avoid making people spend extra time paying attention to unnecessary motion every time they interact with it.

Let people cancel motion. As much as possible, don’t make people wait for an animation to complete before they can do anything, especially if they have to experience the animation more than once.

Consider using animated symbols where it makes sense. When you use SF Symbols 5 or later, you can apply animations to SF Symbols or custom symbols. For guidance, see Animations.

Leveraging platform capabilities
Make sure your game’s motion looks great by default on each platform you support. In most games, maintaining a consistent frame rate of 30 to 60 fps typically results in a smooth, visually appealing experience. For each platform you support, use the device’s graphics capabilities to enable default settings that let people enjoy your game without first having to change those settings.

Let people customize the visual experience of your game to optimize performance or battery life. For example, consider letting people switch between power modes when the system detects the presence of an external power source.

Platform considerations
No additional considerations for iOS, iPadOS, macOS, or tvOS.

visionOS
In addition to subtly communicating context, drawing attention to information, and enriching immersive experiences, motion in visionOS can combine with depth to provide essential feedback when people look at interactive elements. Because motion is likely to be a large part of your visionOS experience, it’s crucial to avoid causing distraction, confusion, or discomfort.

As much as possible, avoid displaying motion at the edges of a person’s field of view. People can be particularly sensitive to motion that occurs in their peripheral vision: in addition to being distracting, such motion can even cause discomfort because it can make people feel like they or their surroundings are moving. If you need to show an object moving in the periphery during an immersive experience, make sure the object’s brightness level is similar to the rest of the visible content.

Help people remain comfortable when showing the movement of large virtual objects. If an object is large enough to fill a lot of the field of view, occluding most or all of passthrough, people can naturally perceive it as being part of their surroundings. To help people perceive the object’s movement without making them think that they or their surroundings are moving, you can increase the object’s translucency, helping people see through it, or lower its contrast to make its motion less noticeable.

Note

People can experience discomfort even when they’re the ones moving a large virtual object, such as a window. Although adjusting translucency and contrast can help in this scenario, consider also keeping a window’s size fairly small.

Consider using fades when you need to relocate an object. When an object moves from one location to another, people naturally watch the movement. If such movement doesn’t communicate anything useful to people, you can fade the object out before moving it and fade it back in after it’s in the new location.

In general, avoid letting people rotate a virtual world. When a virtual world rotates, the experience typically upsets people’s sense of stability, even when they control the rotation and the movement is subtle. Instead, consider using instantaneous directional changes during a quick fade-out.

Consider giving people a stationary frame of reference. It can be easier for people to handle visual movement when it’s contained within an area that doesn’t move. In contrast, if the entire surrounding area appears to move — for example, in a game that automatically moves a player through space — people can feel unwell.

Avoid showing objects that oscillate in a sustained way. In particular, you want to avoid showing an oscillation that has a frequency of around 0.2 Hz because people can be very sensitive to this frequency. If you need to show objects oscillating, aim to keep the amplitude low and consider making the content translucent.

watchOS
SwiftUI provides a powerful and streamlined way to add motion to your app. If you need to use WatchKit to animate layout and appearance changes — or create animated image sequences — see WKInterfaceImage.

Note

All layout- and appearance-based animations automatically include built-in easing that plays at the start and end of the animation. You can’t turn off or customize easing.

Resources
Related
Feedback

Accessibility

Spatial layout

Immersive experiences

Developer documentation
Animating views and transitions — SwiftUI

Spatial layout
Spatial layout techniques help you take advantage of the infinite canvas of Apple Vision Pro and present your content in engaging, comfortable ways.
A sketch of axes in the X, Y, and Z dimensions, suggesting three-dimensional layout. The image is overlaid with rectangular and circular grid lines and is tinted yellow to subtly reflect the yellow in the original six-color Apple logo.

Field of view
A person’s field of view is the space they can see without moving their head. The dimensions of an individual’s field of view while wearing Apple Vision Pro vary based on factors like the way people configure the Light Seal and the extent of their peripheral acuity.

A screenshot of a blank app window in visionOS. A series of concentric circles overlay the image, conveying 30-, 60-, and 90-degree fields of view.

Important

The system doesn’t provide information about a person’s field of view.

Center important content within the field of view. By default, visionOS launches an app directly in front of people, placing it within their field of view. In an immersive experience, you can help people keep their attention on important content by keeping it centered and not displaying distracting motion or bright, high-contrast objects in the periphery.

Upright viewing
Angled viewing
Play
Avoid anchoring content to the wearer’s head. Although you generally want your app to stay within the field of view, anchoring content so that it remains statically in front of someone can make them feel stuck, confined, and uncomfortable, especially if the content obscures a lot of passthrough and decreases the apparent stability of their surroundings. Instead, anchor content in people’s space, giving them the freedom to look around naturally and view different objects in different locations.

Depth
People rely on visual cues like distance, occlusion, and shadow to perceive depth and make sense of their surroundings. On Apple Vision Pro, the system automatically uses visual effects like color temperature, reflections, and shadow to help people perceive the depth of virtual content. When people move a virtual object in space — or when they change their position relative to that object — the visual effects change the object’s apparent depth, making the experience feel more lifelike.

Because people can view your content from any angle, incorporating small amounts of depth throughout your interface — even in standard windows — can help it look more natural. When you use SwiftUI, the system adds visual effects to views in a 2D window, making them appear to have depth. For developer guidance, see Adding 3D content to your app.

A screenshot of a 2D Notes window in visionOS. A note titled Nature Walks is open on the trailing side of the view, with sketches of leaves accompanied by handwritten text descriptions.

If you need to present content with additional depth, you use RealityKit to create a 3D object (for developer guidance, see RealityKit). You can display the 3D object anywhere, or you can use a volume, which is a component that displays 3D content. A volume is similar to a window, but without a visible frame. For guidance, see visionOS volumes.

Play
Provide visual cues that accurately communicate the depth of your content. If visual cues are missing or they conflict with a person’s real-world experience, people can experience visual discomfort.

Use depth to communicate hierarchy. Depth helps an object appear to stand out from surrounding content, making it more noticeable. People also tend to notice changes in depth: for example, when a sheet appears over a window, the window recedes along the z-axis, allowing the sheet to come forward and become visually prominent.

In general, avoid adding depth to text. Text that appears to hover above its background is difficult to read, which slows people down and can sometimes cause vision discomfort.

Make sure depth adds value. In general, you want to use depth to clarify and delight — you don’t need to use it everywhere. As you add depth to your design, think about the size and relative importance of objects. Depth is great for visually separating large, important elements in your app, like making a tab bar or toolbar stand out from a window, but it may not work as well on small objects. For example, using depth to make a button’s symbol stand out from its background can make the button less legible and harder to use. Also review how often you use different depths throughout your app. People need to refocus their eyes to perceive each difference in depth, and doing so too often or quickly can be tiring.

Scale
visionOS defines two types of scale to preserve the appearance of depth while optimizing usability.

Dynamic scale helps content remain comfortably legible and interactive regardless of its proximity to people. Specifically, visionOS automatically increases a window’s scale as it moves away from the wearer and decreases it as the window moves closer, making the window appear to maintain the same size at all distances.

Play
Fixed scale means that an object maintains the same scale regardless of its proximity to people. A fixed-scale object appears smaller when it moves farther from the viewer along the z-axis, similar to the way an object in a person’s physical surroundings looks smaller when it’s far away than it does when it’s close up.

Play
To support dynamic scaling and the appearance of depth, visionOS defines a point as an angle, in contrast to other platforms, which define a point as a number of pixels that can vary with the resolution of a 2D display.

Consider using fixed scale when you want a virtual object to look exactly like a physical object. For example, you might want to maintain the life-size scale of a product you offer so it can look more realistic when people view it in their space. Because interactive content needs to scale to maintain usability as it gets closer or farther away, prefer applying fixed scale sparingly, reserving it for noninteractive objects that need it.

Best practices
Avoid displaying too many windows. Too many windows can obscure people’s surroundings, making them feel overwhelmed, constricted, and even uncomfortable. It can also make it cumbersome for people to relocate an app because it means moving a lot of windows.

Prioritize standard, indirect gestures. People can make an indirect gesture without moving their hand into their field of view. In contrast, making a direct gesture requires people to touch the virtual object with their finger, which can be tiring, especially when the object is positioned at or above their line of sight. In visionOS, people use indirect gestures to perform the standard gestures they already know. When you prioritize indirect gestures, people can use them to interact with any object they look at, whatever its distance. If you support direct gestures, consider reserving them for nearby objects that invite close inspection or manipulation for short periods of time. For guidance, see Gestures > visionOS.

Rely on the Digital Crown to help people recenter windows in their field of view. When people move or turn their head, content might no longer appear where they want it to. If this happens, people can press the Digital Crown when they want to recenter content in front of them. Your app doesn’t need to do anything to support this action.

Include enough space around interactive components to make them easy for people to look at. When people look at an interactive element, visionOS displays a visual hover effect that helps them confirm the element is the one they want. It’s crucial to include enough space around an interactive component so that looking at it is easy and comfortable, while preventing the hover effect from crowding other content. For example, place multiple, regular-size buttons so their centers are at least 60 points apart, leaving 16 points or more of space between them. Also, don’t let controls overlap other interactive elements or views, because doing so can make selecting a single element difficult.

Let people use your app with minimal or no physical movement. Unless some physical movement is essential to your experience, help everyone enjoy it while remaining stationary.

Use the floor to help you place a large immersive experience. If your immersive experience includes content that extends up from the floor, place it using a flat horizontal plane. Aligning this plane with the floor can help it blend seamlessly with people’s surroundings and provide a more intuitive experience.

To learn more about windows and volumes in visionOS, see Windows > visionOS; for guidance on laying content within a window, see Layout > visionOS.

Platform considerations
Not supported in iOS, iPadOS, macOS, tvOS, or watchOS.

Resources
Related
Eyes

Layout

Immersive experiences

Developer documentation
Presenting windows and spaces — visionOS

Positioning and sizing windows — visionOS

Adding 3D content to your app — visionOS

Videos

Meet SwiftUI spatial layout

Principles of spatial design

Design for spatial user interfaces
Change log
Date

Changes

March 29, 2024

Emphasized the importance of keeping interactive elements from overlapping each other.

June 21, 2023

New page.


FOR MORE ASSESTS OR INFORMATION GO TO THESE WEBSITES

Tailwind UI / Tailwind CSS: tailwindui.com and tailwindcss.com
(The go-to for modern, clean, structural rules and spacing.)

Vercel's Geist Design System: vercel.com/design
(Awesome for really sleek, high-contrast, minimalist vibes.)