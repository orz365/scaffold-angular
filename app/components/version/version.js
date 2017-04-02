'use strict';

angular.module('myApp.version', [
    'myApp.version.interpolate-filter',
    'myApp.version.version-directive'
])
    .value('version', '0.1')
    .value('appName', '就是一个应用名称')
