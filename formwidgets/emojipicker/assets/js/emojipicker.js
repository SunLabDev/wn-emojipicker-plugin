+function ($) {
    "use strict";

    var Base = $.oc.foundation.base,
        BaseProto = Base.prototype

    var EmojiPicker = function (element, options) {
        this.$el = $(element)
        this.options = options || {}
        this.searchInput = $(element).find('.emoji-search-field').first()
        this.resultsDiv = $(element).find('.emoji-result-field').first()
        this.emojiTemplate = $(this.options.emojiTemplate)

        $.oc.foundation.controlUtils.markDisposable(element)
        Base.call(this)
        this.init()
    }

    EmojiPicker.prototype = Object.create(BaseProto)
    EmojiPicker.prototype.constructor = EmojiPicker

    EmojiPicker.prototype.init = function () {
        this.$el.one('dispose-control', this.proxy(this.dispose))

        this.$el.on('click', '.search-btn', this.proxy(this.search))
    }

    EmojiPicker.prototype.dispose = function () {
        this.$el.off('click', '.search-btn', this.proxy(this.search))
        this.$el.off('dispose-control', this.proxy(this.dispose))
        this.$el.removeData('oc.emojiPicker')

        this.$el = null
        this.searchInput = null
        this.resultsDiv = null
        this.emojiTemplate = null

        // In some cases options could contain callbacks,
        // so it's better to clean them up too.
        this.options = null

        BaseProto.dispose.call(this)
    }

    EmojiPicker.DEFAULTS = {}

    EmojiPicker.prototype.search = function () {
        this.resultsDiv.text(this.options.loadingMessage);
        fetch(
            `https://emoji-api.com/emojis?search=${this.searchInput.val()}&access_key=${this.options.apiKey}`,
            {method: 'GET'}
        )
            .then(response => response.json())
            .then(data => {
                if (data === null) {
                    return this.resultsDiv.html(this.options.noResultMessage);
                }

                // Remove duplicates
                var result = [];
                var map = new Map();
                for (var item of data) {
                    if (!map.has(item.character)) {
                        map.set(item.character, true);    // set any value to Map
                        result.push(item);
                    }
                }

                data = result;

                this.resultsDiv.empty();

                data.forEach((emoji) => {
                    var resultBlock = Mustache.render(
                        this.emojiTemplate.html(),
                        { emoji }
                    )

                    this.resultsDiv.append(resultBlock)
                })

                this.resultsDiv.find('.emoji').on('click', this.proxy(this.copyToClipboard))
            })
    }

    // Copy the emoji, credits from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    EmojiPicker.prototype.copyToClipboard = function (event) {
        const el = document.createElement('textarea');
        el.value = $(event.target).text().trim();
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }

    // PLUGIN DEFINITION
    // ============================

    var old = $.fn.emojiPicker

    $.fn.emojiPicker = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), items, result

        items = this.each(function () {
            var $this = $(this)
            var data = $this.data('oc.emojiPicker')
            var options = $.extend({}, EmojiPicker.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) {
                $this.data('oc.emojiPicker', (data = new EmojiPicker(this, options)))
            }

            if (typeof option == 'string') {
                result = data[option].apply(data, args)
            }

            if (typeof result != 'undefined') {
                return false
            }
        })

        return result ? result : items
    }

    $.fn.emojiPicker.Constructor = EmojiPicker

    $.fn.emojiPicker.noConflict = function () {
        $.fn.emojiPicker = old
        return this
    }


    $(document).render(function () {
        $('[data-control="emoji-picker"]').emojiPicker()
    })

}(window.jQuery);
