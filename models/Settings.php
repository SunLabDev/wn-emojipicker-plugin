<?php namespace SunLab\EmojiPicker\Models;

use October\Rain\Database\Model;

class Settings extends Model
{
    use \October\Rain\Database\Traits\Validation;
    public $rules = [
        'api_key' => 'required',
    ];

    public $implement = ['System.Behaviors.SettingsModel'];
    public $settingsCode = 'sunlab_emojipicker_settings';
    public $settingsFields = 'fields.yaml';
}
