<?php namespace SunLab\EmojiPicker\FormWidgets;

use Backend\Classes\FormWidgetBase;
use SunLab\EmojiPicker\Models\Settings;

/**
 * EmojiPicker Form Widget
 */
class EmojiPicker extends FormWidgetBase
{
    /**
     * @inheritDoc
     */
    protected $defaultAlias = 'sunlab_emojipicker_emoji_picker';

    public function prepareVars()
    {
        $this->vars['apiKey'] = Settings::instance()->api_key;
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('emojipicker');
    }

    /**
     * @inheritDoc
     */
    public function loadAssets()
    {
        $this->addCss('css/emojipicker.css', 'SunLab.EmojiPicker');
        $this->addJs('js/emojipicker.js', 'SunLab.EmojiPicker');
    }
}
