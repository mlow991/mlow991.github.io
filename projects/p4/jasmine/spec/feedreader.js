/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Suite for the collection of RSS feeds
    describe('RSS Feeds', function() {
        // Define variables used within the scope of multiple specs
        var len = allFeeds.length;
        var dane;

        beforeAll(function() {
            // Create class that verifies a variable is defined
            // and is not empty
            function DefinedAndNotEmpty() {
                this.test = function() {
                    expect(this.var).toBeDefined();
                    expect(this.var.length).not.toBe(0);
                };
            }
            dane = new DefinedAndNotEmpty();
        });

        // Checks to see if allFeeds is defined and is not empty
        it('are defined', function() {
            dane.var = allFeeds;
            dane.test();
        });

        // Checks to see if each element in allFeeds has a url defined
        // and is not empty
        it('url is defined and is not empty', function() {
            for(i = 0; i < len; i++) {
                dane.var = allFeeds[i].url;
                dane.test();
            }
        }); 

        // Checks to see if each element has a name and is also not
        // empty
        it('name is defined and is not empty', function() {
            for(i = 0; i < len; i++) {
                dane.var = allFeeds[i].name;                
                dane.test();
            }
        });
    });



    // Suite for the menu that can be toggled on and off the screen.
    // Is initially offscreen.
    describe('The Menu', function() {
        // Checks to see if the menu is intially hidden from the user
        it('menu is initially hidden from view', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Checks to see if the menu button functions properly (each click
        // either toggles the menu on/off the screen)
        it('menu is displayed when icon is clicked, and hides when clicked a second time', function() {
            // Execute a click command on the menu icon
            $('.menu-icon-link').click();
            // Check to see if the 'menu-hidden' class has been removed.
            // We know the first click will remove the class since the menu
            // is initally hidden from view.
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Suite for the RSS feed entries that spawn when the page is initially loaded/refreshed
    describe('Initial Entries', function() {
        // Load the feed asynchronously so that the done() method can tell
        // the spec when to execute.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Checks to see if the initial RSS feed entry count is at least 1.
        it('should have at least one entry', function(done) {
            // Gather all the entries within the 'feed' class and check the length
            // of the array.  The collection should have a length of at least 1 to 
            // pass the test.
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    // Suite for any new feeds that are spawned via the menu
    describe('New Feed Selection', function() {
        // Declare a holder variable for multiple feed data
        var feeds = [];

        // Loads a feed before the spec runs
        beforeEach(function(done) {
            loadFeed(1, function() {
                // Store the html of the feed in the holder variable
                feeds.push($('.feed').text());
                // Vital due to the asynchronous nature of the rss feed
                done();
            });
        });

        // Checks to see if the content from two different feed loads is
        // different.
        it('should load new content', function(done) {
            // Load a different feed from the beforeEach function
            loadFeed(3, function() {
                // Store the html for this new feed in the holder variable
                feeds.push($('.feed').text());
                // Compare the two chunks of html and make sure
                // that they are different.
                expect(feeds[0]).not.toEqual(feeds[1]);
                done();
            });
        });
    });

    // Suite for the delete feed button.
    // This feature has yet to be added, but might be in the form of
    // an 'x' button next to each feed in the menu.  Clicking this 'x'
    // will call the method 'removeFeed(index)' where the 'index' is 
    // the 'data-id' of the item in the menu.  This is also the position
    // of the feed within the allFeeds array, and their position in the menu.
    // After the removeFeed function is called, another function should be called
    // afterwards that re-assigns the 'data-id' of the remaining
    // RSS feeds to match the original pattern of "0, 1, 2, 3 etc..."
    describe('Deleted Feed', function() {
        // The arbitrary test index
        var index = 2;

        // Check to see if the list menu's RSS feeds and their 'x' delete button pair
        // have the same numerical index
        it("menu items should correspond to their delete buttons", function() {
            var itemIndex = [];
            var buttonIndex = [];
            var item = $('.feed-list').find('a');
            var button = $('.feed-list').find('button');
            var len = item.length;
            for(i = 0; i < len; i++) {
                itemIndex.push($(item[i]).attr('data-id'));
                // Uses substring because the button identifier is has a 'b' prefix.
                // ex: so the first button will be 'b0' and the item will be '0'.
                // So once the 'b' prefix is removed the two can be compared.
                buttonIndex.push($(button[i]).attr('data-id').substring(1));
            }
            for(i = 0; i < len; i++) {
                expect(itemIndex[i]).toEqual(buttonIndex[i]);
            }
        });
        // Checks to see if the removed RSS feed is still listed in the menu
        it('should not be visible in the menu', function() {
            removeFeed(index);
            var item = $('.feed-list').find('a')[index];
            // The index and the position of the list item in the <a> tag
            // array are the same value.
            expect(Number($(item).attr('data-id'))).not.toEqual(index);
        });
    });

    // Suite for changing the color scheme of the RSS feed page
    describe('Color Scheme', function() {
        // Checks to see if the changeColor function actually
        // changes the color
        it('should change color', function() {
            // Since we already know the default color is a form of green
            // we can choose our changed color to be red and then check to
            // see if all elements with green color are now red.
            var red = 'rgb(255, 0, 0)';
            changeColor(red);
            // Menu and header are the only two elements for this color scheme.
            var menu = $(".menu").css('background-color');
            var header = $('.header').css('background-color');
            expect(menu).toEqual(red);
            expect(header).toEqual(red);
        });
    });
}());
