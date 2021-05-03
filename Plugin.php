<?php namespace SunLab\EmojiPicker;

use Backend;
use SunLab\EmojiPicker\FormWidgets\EmojiPicker;
use SunLab\EmojiPicker\Models\Settings;
use System\Classes\PluginBase;
use System\Classes\SettingsManager;

/**
 * EmojiPicker Plugin Information File
 */
class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name'        => 'EmojiPicker',
            'description' => 'sunlab.emojipicker::lang.plugin.description',
            'author'      => 'SunLab',
            'icon'        => 'icon-smile-o',
        ];
    }

    public function registerPermissions()
    {
        return [
            'sunlab.emojipicker.access_settings' => [
                'tab' => 'EmojiPicker',
                'label' => 'sunlab.emojipicker::lang.permission.label'
            ],
        ];
    }

    public function registerSettings()
    {
        return [
            'settings' => [
                'label'       => 'EmojiPicker',
                'description' => 'sunlab.emojipicker::lang.settings.description',
                'category'    => SettingsManager::CATEGORY_SYSTEM,
                'icon'        => 'icon-smile-o',
                'class'       => Settings::class,
                'order'       => 500,
                'keywords'    => 'credentials api key',
                'permissions' => ['sunlab.emojipicker.access_settings']
            ]
        ];
    }

    public function registerFormWidgets()
    {
        return [
            EmojiPicker::class => 'emojipicker'
        ];
    }
}
