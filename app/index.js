'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');

/* jshint -W106 */
var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
/* jshint +W106 */
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  githubOptions.proxy = {};
  githubOptions.proxy.host = url.parse(proxy).hostname;
  githubOptions.proxy.port = url.parse(proxy).port;
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var IsomodGenerator = module.exports = function IsomodGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(IsomodGenerator, yeoman.generators.Base);

IsomodGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(chalk.magenta('Your module can be so special with isomod!'));

  var prompts = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'I so happy to name this module, what?',
    default: this._.last(process.cwd().split('/'))
  }
  ,{
    type: 'input',
    name: 'moduleVersion',
    message: 'I so version this module at:',
    default: '0.0.1'
  }
  ,{
    type: 'input',
    name: 'githubUser',
    message: 'I so active on github as:',
    default: 'someUser'
  }
  ,{
    type: 'input', 
    name: 'licenseType',
    message: 'I so grant this license:',
    default: 'MIT'
  }

  ];

  this.prompt(prompts, function (props) {
    this.moduleName = props.moduleName;
    this.moduleVersion = props.moduleVersion;
    this.githubUser = props.githubUser;
    this.licenseType = props.licenseType;

    cb();
  }.bind(this));
};

IsomodGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
}

IsomodGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('bin');
  this.mkdir('test');
  this.mkdir('cmds');
  this.mkdir('demo');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('Gruntfile.js');

  this.directory('src', 'src');
  this.directory('test', 'test');
  this.directory('demo', 'demo');
  this.template('_iso-module.coffee', path.join('src', _s.slugify(this.moduleName) + "-module.coffee") );

  this.template('bin/_isobin', path.join('bin', _s.camelize(this.moduleName)) );

  this.template('cmds/_shell.js', path.join('cmds', 'shell.js') );
};

IsomodGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.template('_travis.yml', '.travis.yml');
};
