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

    'use strict';
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*TEST 1
         *
         * This test loops through each feed and  checks it has a URL defined and the URL is not empty.
         *
         */


        it('have valid URLs defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
            });

        });


        /*TEST 2
         *
         * This test loops through each feed and  checks it has a name defined and the name is not empty.
         *
         */

        it('have valid names defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            });
        });

    });


    /* "The menu" - Test suite */
    describe('The menu', function() {

        /*TEST 3
         *
         *This test checks if the menu element is hidden by default.
         *The test is to check if the body has the class 'menu-hidden'.
         *
         */

        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });


        /*TEST 4
         *
         *This test checks if the menu change visibility if the menu icon is clicked.
         *It has two expectations: the menu displays when clicked and hide when clicked again.
         *
         */

        it('changes visibility when the menu icon is clicked', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    /* "Initial Entries" - Test suite */
    describe('Initial Entries', function() {

        /*TEST 5
         *
         *This test checks if the loadFeed function works correctly.
         *It checks if at least one .entry element is within the .feed container.
         *
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("there is at least one .entry element within the .feed container", function(done) {
            var entries = $('.feed').find('.entry');
            expect(entries.length >= 1).toBe(true);
            done();
        });
    });

    /* "New Feed Selection" - Test suite */
    describe('New Feed Selection', function() {
        var theFirstFeed, theSecondFeed;
        /*TEST 6
         *
         *This test checks if when a new feed is loaded by loadFeed the content actually changes.
         *
         */



        beforeEach(function(done) {
            //Load the first feed
            loadFeed(0, function() {
                /*Store the content of the first feed in a variable*/
                theFirstFeed = $('.header-title').html() + ':' + $('.entry').find('h2').html();

                console.log('The first feed > ' + theFirstFeed);
                //Load the second feed
                loadFeed(1, function() {
                    /*Store the content of the second feed in a variable*/
                    theSecondFeed = $('.header-title').html() + ':' + $('.entry').find('h2').html();

                    console.log('The second feed > ' + theSecondFeed);
                    done();
                });
            });
        });

        //go back to the original feed after testing
        afterAll(function(done) {
            loadFeed(0, done);
        });

        it('content actually changes when new feed is loaded', function() {

            expect(theFirstFeed).not.toEqual(theSecondFeed);
            //To test if thes faild use: expect(theFirstFeed).toEqual(theSecondFeed);

        });

    });

}());