define(
    [
        'jquery',
        'vue',
        'showdown',
        'app/helper'
    ],
    function($, Vue, showdown, helper) {
        jQuery(document).ready(function($) {
            const app = new Vue({
                el: '#app',

                data: {
                    inputText: "",
                    outputHTML: "",
                    isTwoColumn: 0,
                    includeImgHolders: 0
                },

                methods: {
                    createHTML: function() {
                        console.log(this.includeImgHolders);
                        console.log(this.isTwoColumn);
                        showdown.setOption('noHeaderId', true);
                        var converter = new showdown.Converter();
                            text = this.inputText;

                        // Convert from Markdown
                        var output = converter.makeHtml(text);

                        // Manipulate output HTML to add some classes
                        output = helper.addBootstrapClasses(output, this.isTwoColumn, this.includeImgHolders);
                        console.log(output);

                        // Clean up and format HTML, return for output
                        this.outputHTML = output.replace(/>[\n\t ]+</g, "><");
                    }
                }
            });
        });
    }
);
