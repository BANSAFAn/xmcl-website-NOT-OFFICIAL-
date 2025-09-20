# How to Add Your Own Translation

To add a new language to the XMCL website project:

1. **Create translation files:**
   - In `src/locales/`, create a new JSON file named after the language code (e.g., `fr.json` for French).
   - Copy the structure from `en.json` and translate all strings.
   - In `src/locale/`, create a new YAML file named after the language code (e.g., `fr.yaml`).
   - Copy the structure from `en.yaml` and translate all strings.

2. **Update configuration:**
   - Edit `src/i18n/languageConfigs.ts`.
   - Add a new entry to the `languageConfigs` array with the code, name, flag, and color gradient (e.g., { code: 'fr', name: 'Français', flag: '🇫🇷', color: 'from-blue-500 to-red-500' }).

3. **Test the translation:**
   - Run the development server (`npm run dev`).
   - Select the new language from the language selector.
   - Verify that all texts are correctly translated and displayed.

4. **Contribute your changes:**
   - Commit your changes to Git.
   - Create a pull request on the project's GitHub repository.

## About i18n.md
This file serves as documentation for the internationalization (i18n) process in the project. You can add notes, examples, or additional instructions here to help other contributors understand how to maintain and add translations.