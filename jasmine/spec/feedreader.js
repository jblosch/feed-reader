/* feedreader.js */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is about the RSS feeds definitions
    */
    describe('RSS Feeds', function() {
        /* This test checks that the allFeeds variable has been
         * defined and that it is not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test checks that each feed
         * in the allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('each have a url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url.length).not.toBe(0);
              expect(feed.url).toBeDefined();
            });
        });


        /* This test checks that each feed
         * in the allFeeds object has a name defined
         * and that the name is not empty.
         */
         it('each have a name defined and not empty', function() {
             allFeeds.forEach(function(feed) {
               expect(feed.name.length).not.toBe(0);
               expect(feed.name).toBeDefined();
             });
         });
    });


    describe('The menu', function() {
        /* This test checks that the menu is hidden by default
        */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test checks that when clicking on the menu button, the
          * menu will appear when it isn't visible and disappear when it is
          */
        it('changes visibility when the menu icon is clicked', function() {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* This test checks to see that the DIV with the 'feed' class contains
         * at least one element with the 'entry' class after loadFeed is
         * executed
         */

        beforeEach(function(done) {
          loadFeed(1, function() {
            done();
          });
        });

        it('has at least one .entry element in the .feed container', function(done) {
          const entry = $('.feed .entry');
          expect(entry.length).toBeGreaterThan(0);
          done();
        });

    });

    describe('New Feed Selection', function() {
        /* This test checks that when loadFeed is run, the content
         * actually changes
         */
         let content;
         let newContent;

         beforeEach(function(done) {
          loadFeed(0, function() {
            content = $('.feed').find($('.entry h2'))[0].innerHTML;
            loadFeed(1, function() {
              newContent = $('.feed').find($('.entry h2'))[0].innerHTML;
              done();
            });
          });
         });

         it('has content that actually changes', function(done) {
           expect(content).not.toBe(newContent);
           done();
         });
    });
}());
