
# Appearance Guide

Learn how to customize the look and feel of X Minecraft Launcher to match your style.

## Overview

X Minecraft Launcher offers extensive customization options to personalize your experience. This guide will walk you through all available appearance settings.

:::tip
You can access appearance settings by clicking the settings icon in the top-right corner of the launcher.
:::

## Theme Selection

### Built-in Themes

The launcher comes with several pre-built themes:

- **Default** - Classic blue theme
- **Dark** - Pure black interface  
- **Light** - Clean white theme
- **Gaming** - RGB gaming aesthetic
- **Minimal** - Clean and simple

### Custom Themes

You can create your own themes by:

1. Navigate to Settings → Appearance → Custom Themes
2. Click "Create New Theme"
3. Customize colors, fonts, and layouts
4. Save and apply your theme

:::important
Custom themes are stored locally and won't sync across devices unless you export them.
:::

## Background Customization

### Static Backgrounds

Upload your own images:
- Supported formats: PNG, JPG, GIF
- Recommended resolution: 1920x1080 or higher
- Maximum file size: 10MB

### Animated Backgrounds

Enable dynamic backgrounds:
- Particle effects
- Animated gradients  
- Video backgrounds (MP4 format)

:::note
Animated backgrounds may impact performance on older hardware.
:::

## Font Settings

Customize typography:

| Setting | Options | Default |
|---------|---------|---------|
| Font Family | System fonts + custom | Segoe UI |
| Font Size | 10px - 24px | 14px |
| Font Weight | Light, Normal, Bold | Normal |

## Layout Options

### Sidebar Configuration
- Position: Left, Right, Hidden
- Width: Adjustable from 200px to 400px
- Auto-collapse on small screens

### Button Styles
- Rounded corners
- Shadow effects
- Hover animations
- Icon positioning

## Advanced Customization

### CSS Injection

For advanced users, you can inject custom CSS:

```css
/* Example: Custom button styling */
.download-button {
  background: linear-gradient(45deg, #ff6b6b, #ffd93d);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.download-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}
```

:::warning
Custom CSS may break with launcher updates. Use with caution.
:::

## Performance Tips

To maintain smooth performance:

- Limit animated elements
- Use compressed images
- Avoid complex particle effects on low-end hardware
- Enable hardware acceleration in settings

## Troubleshooting

### Common Issues

**Theme not applying?**
- Restart the launcher
- Check file permissions
- Verify theme file integrity

**Performance issues?**
- Disable animations
- Use static backgrounds
- Reduce particle count

**Missing fonts?**
- Install required fonts on your system
- Use web-safe font alternatives
- Check font file format compatibility

## Export/Import Settings

Share your customizations:

1. Go to Settings → Appearance → Export
2. Save configuration file
3. Share with friends or backup for later
4. Import using Settings → Appearance → Import

This allows you to sync settings across multiple devices or share your custom setup with the community.
