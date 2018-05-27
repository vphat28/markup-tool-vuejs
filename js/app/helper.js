define(
    ['jquery'],
    function($) {
        return {
            addBootstrapClasses: function(html, isTwoColumn, includeImgHolders) {
                const self = this;
                var output = $($.parseHTML("<div>" + html + "</div>"));

                // Wrap h2 with theme class
                output.find('h2').each(function(){
                    var heading = $(this);
                    heading.replaceWith(function() {
                        heading.addClass('blproduct_heading');
                        return "<div class='row'><div class='col-md-12'>" + $(this).prop('outerHTML') + "</div></div>";
                    });
                });

                // Group sub heading into a wrapper, add columns if needed
                var subHeadingsContainer = $($.parseHTML("<div class='row'></div>"));
                output.find('h3').first().before(subHeadingsContainer);
                output.find('h3').each(function() {
                    var heading = self._prepareSubheading($(this), isTwoColumn, includeImgHolders);
                    subHeadingsContainer.append(heading);
                });

                return output.html();
            },

            _prepareSubheading: function(heading, isTwoColumn, includeImgHolders) {
                const self = this;

                // Getting text next to it
                var text = heading.next();
                var subHeadingBlock;

                if (parseInt(isTwoColumn) === 1) {
                    subHeadingBlock = $($.parseHTML("<div class='col-md-6'><div class='row'></div></div>"));
                } else {
                    subHeadingBlock = $($.parseHTML("<div class='col-md-12'><div class='row'></div></div>"));
                }

                // If include image holder then add blank image with alt attribute
                if (parseInt(includeImgHolders) === 1) {
                    subHeadingBlock.find('.row').append("<div class='col-md-4'><img src='' alt='Place image here' class='bl_product_img_l img-responsive'></div>");
                    subHeadingBlock.find('.row').append("<div class='col-md-8'><h3 class='bl_product_subheading'></h3><p class='bl_product_text'></p></div>");
                } else {
                    // If no image required then heading will take full width with class col-md-12
                    subHeadingBlock.find('.row').append("<div class='col-md-12'><h3 class='bl_product_subheading'></h3><p class='bl_product_text'></p></div>");
                }

                subHeadingBlock.find('.bl_product_text').html(text.html());
                subHeadingBlock.find('.bl_product_subheading').html(heading.html());
                text.remove();
                heading.remove();

                return subHeadingBlock;
            }
        };
    }
);
