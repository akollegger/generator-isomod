/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('isomod generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('isomod:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig'
        ];

        // Patch the user info to not run into rate limits on travis
        this.app.userInfo = function () {
          this.realname = 'Tyrion Lannister';
          this.email = 'imp@casterlyrock.com';
          this.githubUrl = 'https://github.com/imp';
        };

        helpers.mockPrompt(this.app, {
          'moduleName': 'temp',
          'moduleVersion': '0.0.1',
          'githubUser': 'imp',
          'licenseType': 'unlicensed'
        });


        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
